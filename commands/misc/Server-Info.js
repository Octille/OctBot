module.exports = {
	name: 'server',
	description: 'Display info about this server.',
	async execute(message,args, cmd, client, Discord) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};