const Discord = require("discord.js");

module.exports = {
    name: 'ping',
    description: "this is a ping cmd",
    async execute(message,args, cmd, client, Discord){
             const embed = new Discord.MessageEmbed()
            .setTitle('Bots ping')
            .setColor('RANDOM')
            .setDescription(`🏓 | Latency is ${Date.now() - message.createdTimestamp}ms.
            📚 | API Latency is ${Math.round(client.ws.ping)}ms`); 

        message.channel.send(embed)              
    }
    }