module.exports = {
    name: 'vote',
    async execute(message, args, cmd, client, Discord, profileData, settings){
        const discord = require("discord.js")
        const embed = new discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle('Want free rewards and coins?')
        .setDescription(`You can get coins and rewards by voting octbot on top.gg which can be done by clicking [here](https://top.gg/bot/741776473613926490/vote)\n**after voting you can check by doing ${settings.prefix}didivote**`)
        .setFooter('To claim reward please do a command!')
        message.channel.send(embed)
    }
}