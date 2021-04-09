module.exports = {
    name: 'vote',
    async execute(message, args, cmd, client){
        const discord = require("discord.js")
        const embed = new discord.MessageEmbed()
        .setTitle('Want free rewards and coins?')
        .setDescription('you can get coins and rewards by voting octbot on top.gg which can be done by clicking [here](https://top.gg/bot/741776473613926490/vote)')
        message.channel.send(embed)
    }
}