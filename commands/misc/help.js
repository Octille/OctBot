const fs = require('fs');
const path = require('path');
const pagination = require('discord.js-pagination');
const discord = require('discord.js');
const client = new discord.Client(); 
const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    aliases: ["h"],
    description: 'send this message',
    async execute(message, args, cmd, client, Discord, profileData, settings) {
        if(!args.length){
            const noargsembed = new Discord.MessageEmbed()
            .setAuthor( `Oct Bot Commands`, 'https://cdn.discordapp.com/avatars/741776473613926490/9254bec36f20830f7632e521b1ef8148.webp')
            .addField(`💰Economy`, `\`${settings.prefix}help economy\``, true)
            .addField(`😄Fun`, `\`${settings.prefix}help fun\``, true)
            .addField(`<:Minecraft:823941357872873472>Minecraft`, `\`${settings.prefix}help minecraft\``, true)
            .addField(`🔧Moderation`, `\`${settings.prefix}help moderation\``, true)
            .addField(`💡Misc`, `\`${settings.prefix}help misc\``, true)
            .addField(`🎶Music`, `\`${settings.prefix}help music\``, true)
            .setDescription(`[Invite Me](https://discord.com/api/oauth2/authorize?client_id=741776473613926490&permissions=4294967287&scope=bot) • [Support Server](https://discord.gg/hE28auh4R5) • [top.gg](https://top.gg/bot/432610292342587392/invite/) • [Website](https://octbot.ml/home/)`, )
            .setFooter(`for even more info you can do ${settings.prefix}help (command name)`)
            .setColor("BLUE")
            return message.channel.send(noargsembed)
       
}
let title;
if (args[0].toLowerCase() === 'misc') title = `💡Misc commands`;
if (args[0].toLowerCase() === 'economy') title = `💰Economy commands`;
if (args[0].toLowerCase() === 'minecraft') title = `<:Minecraft:823941357872873472>Minecraft commands`;
if (args[0].toLowerCase() === 'moderation') title = `🔧Moderation commands`;
if (args[0].toLowerCase() === 'music') title = `🎶Music commands`;
if (args[0].toLowerCase() === 'fun') title = `😄Fun commands`;
if(title){
    fs.readdir(path.join(__dirname, '..', `${args[0].toLowerCase()}`), (err1, files1, dir) => {
        const cmd = files1.map(file => `\`${file}\``)
    const Miscembed = new Discord.MessageEmbed()
    .setTitle(title)
    .setDescription(`${cmd.toString()
    .replace(/[{()}]/g, '')
    .replace(/.js/g, '')
    .replace(/,/g, ', ')}`)
    .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
    return message.channel.send(Miscembed)
    });
    }

const data = [];
const { commands } = message.client;
const name = args[0].toLowerCase();
const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
if (!command) {
    return 
}
if (command.name) data.push(`**Name:** ${command.name}`);
if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.description) data.push(`**Description:** ${command.description}`);
if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
data.push(`**Cooldown:** ${command.cooldown || 0} second(s)`);
const helpembed = new discord.MessageEmbed()
.setTitle(command.name + ` Info`)
.setDescription(data)
.setColor("RANDOM")
message.channel.send(helpembed);
}

}
