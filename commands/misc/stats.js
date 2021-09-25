const ms = require('ms');
module.exports = {
    name: 'stats',
    async execute(message,args, cmd, client, Discord, profileData){
        const statsEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle('My Stats')
        .addField(`Servers:`,`\`${client.guilds.cache.size}\``, true)
        .addField(`Members:`,`\`${client.users.cache.size}\``, true)
        .addField(`Commands:`,`\`${client.commands.size}\``, true)
        .addField(`Uptime:`,`\`${ms(client.uptime, { long: true }) }\``, true)
        .addField(`Online since:`,`\`${client.readyAt.toDateString()}\``, true)
        message.channel.send(statsEmbed)
 
    }
}