const ms = require('ms');

const Discord = require('discord.js');

module.exports = {
    name: "uptime",
    description: "Get the answer to a math problem",
    async execute(message,args, cmd, client, Discord){
        const embed = new Discord.MessageEmbed()
        .setTitle('Uptime')
        .setDescription(`I have been online for **${ms(client.uptime, { long: true }) }**`)
        .setFooter(`Vote for oct bot on top.gg befor I go offline D:\n${client.user.username}`)
        .setTimestamp()
        .setColor("BLUE")
        message.channel.send(embed);

    }
}