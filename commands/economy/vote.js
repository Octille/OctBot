module.exports = {
    name: 'vote',
    async execute(message, args, cmd, client, Discord, profileData, settings){
        const discord = require("discord.js")
        const embed = new discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle('Vote for Oct Bot!')
        .setDescription(`Vote Oct Bot on top.gg for free rewards!
        **Top.gg**
        [click here](https://top.gg/bot/741776473613926490/vote)

        Rewards:
        **₪ 500, 000**`)
        .setFooter(`After voting you can check by doing ${settings.prefix}didivote.`)
        message.channel.send(embed)
    }
}