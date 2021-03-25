module.exports = {
    name: 'invite',
    description: '',
    async execute(message, args, cmd, client, Discord, profileData, settings) {

        const botname = '<@741776473613926490>'
        const invite = new Discord.MessageEmbed()
        .setTitle(`Hi im OctBot and heres all my invite links`, `_ _`)
        .setDescription(`Invite Oct::link:**\<https://bit.ly/38OiD4C\>**\nOct server: https://discord.gg/hE28auh4R5`)

        message.channel.send(invite)

    }

}