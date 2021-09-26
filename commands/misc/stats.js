const ms = require('ms');
module.exports = {
    name: 'stats',
    async execute(message,args, cmd, client, Discord, profileData){
        const nextRestart = ms(86400000 - client.uptime, {long: true})
        const statsEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setTitle('My Stats')
        .addField(`Servers:`,`\`${client.guilds.cache.size}\``, true)
        .addField(`Members:`,`\`${client.users.cache.size}\``, true)
        .addField(`Commands:`,`\`${client.commands.size}\``, true)
        .addField(`Uptime:`,`\`${ms(client.uptime, { long: true }) }\``, true)
        .addField(`Estimated Restart In:`,`\`${nextRestart}\``, true)
        .addField(`Online Since:`,`\`${client.readyAt.toDateString()}\``, true)
        .setFooter(`Oct bot restarts every 24 hour to prevent lag.\nEstimated downtime is 10-15s`)
        message.channel.send(statsEmbed)
 
    }
}