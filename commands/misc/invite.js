module.exports = {
    name: 'invite',
    description: '',
    async execute(message, args, cmd, client, Discord, profileData, settings) {

        const botname = '<@741776473613926490>'
        const invite = new Discord.MessageEmbed()
        .setDescription(`Hi im <@741776473613926490> and heres all my invite links`, `_ _`)
        .addField(`Invite Oct:`, `[click me](https://discord.com/oauth2/authorize?client_id=741776473613926490&scope=bot&permissions=5166394750)`, true)
        .addField(`Oct server:`, `[click me](https://discord.gg/RJBeFnzbRe)`, true)
        .addField(`top.gg link:`, `[click me](https://top.gg/bot/432610292342587392/invite/)`, true)
        .addField(`Oct Bot Website:`, `[click me](https://octbot.ml/home/)`)

        message.channel.send(invite)

    }

}