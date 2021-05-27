const TicketData = require('../../models/TicketData');
const cooldown = new Set();
const {
	MessageEmbed,
	MessageCollector
} = require('discord.js');
const message = require('./message');

module.exports = async (Discord, client, reaction, user) => {

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
		let successMsg = await channel.send(`${user.toString()}`, successEmbed);
		await cooldown.add(user.id);
		await checkIfClose(client, reaction, user, successMsg, channel);
		setTimeout(function () {
			cooldown.delete(user.id);
		}, 300000);
	}
}

async function checkIfClose(client, reaction, user, successMsg, channel) {
	const filter = m => m.content.toLowerCase() === 'done'
	const collector = new MessageCollector(channel, filter);

	const filter1 = m => m.content.toLowerCase() === 'cancel'
	const collector1 = new MessageCollector(channel, filter1);

	collector.on('collect', async msg => {
        const discord = require('discord.js')
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

		channel.send(ticketclosed);
		await collector.stop();

		let notcanceled;
		collector1.on('collect', async msg => {
			channel.send(canceleddelete)
			notcanceled = 1;
			checkIfClose(client, reaction, user, successMsg, channel)
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