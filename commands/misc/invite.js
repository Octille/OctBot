const { MessageButton } = require("discord-buttons")
module.exports = {
    name: 'invite',
    description: '',
    async execute(message, args, cmd, client, Discord, profileData, settings) {
        let InviteButton = new MessageButton()
        .setStyle('red')
        .setLabel('Invite Me')
        .setID('click_to_function')
        .setURL('[click_to_function](https://top.gg/bot/741776473613926490/vote)')

        let VoteButton = new MessageButton()
        .setStyle('green')
        .setLabel('Vote Me')
        .setID('Vote_Me')
        .setURL('[Vote_Me](https://top.gg/bot/741776473613926490/vote)')

        const botname = '<@741776473613926490>'
        const invite = new Discord.MessageEmbed()
        .setDescription(`Hi im <@741776473613926490> and heres all my invite links`, `_ _`)
        .addField(`Invite Oct:`, `[click me](https://discord.com/oauth2/authorize?client_id=741776473613926490&scope=bot&permissions=5166394750)`, true)
        .addField(`Oct server:`, `[click me](https://discord.gg/RJBeFnzbRe)`, true)
        .addField(`top.gg link:`, `[click me](https://top.gg/bot/741776473613926490)`, true)
        .addField(`Oct Bot Website:`, `[click me](https://octbot.ml/home/)`)

        message.channel.send({
            embed: invite
        })

    }

}