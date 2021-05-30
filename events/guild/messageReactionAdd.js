const TicketData = require('../../models/TicketData');
const cooldown = new Set();
const {
	MessageEmbed,
	MessageCollector
} = require('discord.js');
const message = require('./message');
const discord = require('discord.js')
const { promptMessage } = require("../../functions");
const ReactionRoleSchema = require('../../models/ReactionRole');
module.exports = async (Discord, client, reaction, user) => {
	const reactionData = await ReactionRoleSchema.findOne({
		GuildID: reaction.message.guild.id,
		MessageID: reaction.message.id,
		Emoji: reaction.emoji.name,
	});

	if(reactionData){
		if (reaction.emoji.name === reactionData.Emoji){
			if(reaction.message.id == reactionData.MessageID){
				await reaction.message.guild.members.cache.get(user.id).roles.add(reactionData.RoleID);
			}
		}
	}

	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();

	if (!reaction.message.guild) return;

	const data = await TicketData.findOne({
		GuildID: reaction.message.guild.id
	});
	if (!data) return;
	if (reaction.message.partial) await reaction.message.fetch();

	if (reaction.emoji.name === '🎟' && reaction.message.id === data.MessageID) {
        reaction.users.remove(user.id);
		if (cooldown.has(user.id)) {
			reaction.users.remove(user.id);
			const pleasewait = new discord.MessageEmbed()
			.setTitle('Ticket')
			.setDescription('Please wait befor creating a new ticket!')
			.setFooter('The cooldown for tickets are 30m.')
			.setColor("RED")
			user.send(pleasewait)
			try{
				
			}catch(err){

			}
			return;
		}
		data.TicketNumber += 1;
		await data.save();
		const channel = await reaction.message.guild.channels.create(`ticket-${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`, {
			type: 'text',
			permissionOverwrites: [{
				id: reaction.message.guild.id,
				deny: ['VIEW_CHANNEL'],
			},],
		});
		await channel.createOverwrite(user, {
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
			SEND_TTS_MESSAGES: false
		});
		await channel.createOverwrite(data.WhitelistedRole, {
			VIEW_CHANNEL: true,
			SEND_MESSAGES: true,
			SEND_TTS_MESSAGES: false
		});
		reaction.users.remove(user.id);
		const successEmbed = new MessageEmbed()
			.setTitle(`Ticket #${'0'.repeat(4 - data.TicketNumber.toString().length)}${data.TicketNumber}`)
			.setDescription(`This ticket was created by ${user.toString()}.\nPlease say \`done\` when you're finished.`)
			.setColor('BLUE');

			await checkIfClose(client, reaction, user, channel);
			await cooldown.add(user.id);
			setTimeout(function () {
				cooldown.delete(user.id);
			}, 300000);
	
		let successMsg = await channel.send(`${user.toString()} <@&${data.WhitelistedRole}>`, successEmbed).then(async msg =>  {

			const emoji = await promptMessage(msg, user, 30000, ["🔒", "⛔"]);

			if(emoji == "🔒"){

				channel.updateOverwrite(user.id, { SEND_MESSAGES: false });
				const ticketlocked = new discord.MessageEmbed()
				.setTitle('Ticket Locked!')
				.setDescription(`This channel has been locked for the user.`)
				.setColor('BLUE');
				channel.send(ticketlocked);
			}else if(emoji == "⛔"){


				const ticketclosed = new discord.MessageEmbed()
				.setTitle('Ticket Closed!')
				.setDescription(`This channel will be deleted in **5** seconds.`)
				.setColor('BLUE');
				channel.send(ticketclosed);
				setTimeout(() => channel.delete(), 5000);
			}
		});



		
	}
}



const ticketclosed = new discord.MessageEmbed()
.setTitle('Ticket Closed!')
.setDescription(`This channel will be deleted in **5** seconds.`)
.setFooter('You can cancel by typing "cancel".')
.setColor('BLUE');

const canceleddelete = new discord.MessageEmbed()
.setTitle('Canceled!')
.setDescription('This ticket has been canceled!')
.setFooter('You can delete this channel by typing "done".')
.setColor("BLUE");


async function checkIfClose(client, reaction, user, channel) {
	const filter = m => m.content.toLowerCase() === 'done'
	const collector = new MessageCollector(channel, filter);

	const filter1 = m => m.content.toLowerCase() === 'cancel'
	const collector1 = new MessageCollector(channel, filter1);

	collector.on('collect', async msg => {


		channel.send(ticketclosed);
		await collector.stop();

		let notcanceled;
		collector1.on('collect', async msg => {
			channel.send(canceleddelete)
			notcanceled = 1;
			checkIfClose(client, reaction, user, channel)
		});


		setTimeout(function () {	
			try{
				if(!notcanceled){
					channel.delete()
				}
			}catch (err) {
			}
		}, 5000);
	});
}