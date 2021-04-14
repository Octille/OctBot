module.exports = {
	name: 'serverinfo',
	description: 'Display info about this server.',
	async execute(message,args, cmd, client, Discord) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
		const target = message.mentions.members.first();
		console.log(target.user)
	},
};