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
            .setColor("BLUE")
            return message.channel.send(noargsembed)
       
}
if(args[0] == `misc`){
fs.readdir(path.join(__dirname, '..', `misc`), (err1, files1, dir) => {
    const cmd = files1.map(file => `\`${file}\``)
const Miscembed = new Discord.MessageEmbed()
.setTitle(`💡Misc commands`)
.setDescription(`${cmd.toString()
.replace(/[{()}]/g, '')
.replace(/.js/g, '')
.replace(/,/g, ', ')}`)
.setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
return message.channel.send(Miscembed)
});
}
if(args[0] == `fun`){
    fs.readdir(path.join(__dirname, '..', `Fun`), (err1, files1, dir) => {
        const cmd = files1.map(file => `\`${file}\``)
    const Funembed = new Discord.MessageEmbed()
    .setTitle(`😄Fun commands`)
    .setDescription(`${cmd.toString()
    .replace(/[{()}]/g, '')
    .replace(/.js/g, '')
    .replace(/,/g, ', ')}`)
    .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
    return message.channel.send(Funembed)
    });
    }
    if(args[0] == `economy`){
        fs.readdir(path.join(__dirname, '..', `Economy`), (err1, files1, dir) => {
            const cmd = files1.map(file => `\`${file}\``)
        const ecoembed = new Discord.MessageEmbed()
        .setTitle(`💰Economy commands`)
        .setDescription(`${cmd.toString()
        .replace(/[{()}]/g, '')
        .replace(/.js/g, '')
        .replace(/,/g, ', ')}`)
        .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
        return message.channel.send(ecoembed)
        });
        }
        if(args[0] == `minecraft`){
            fs.readdir(path.join(__dirname, '..', `Minecraft`), (err1, files1, dir) => {
                const cmd = files1.map(file => `\`${file}\``)
            const minembed = new Discord.MessageEmbed()
            .setTitle(`<:Minecraft:823941357872873472>Minecraft commands`)
            .setDescription(`${cmd.toString()
            .replace(/[{()}]/g, '')
            .replace(/.js/g, '')
            .replace(/,/g, ', ')}`)
            .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
            return message.channel.send(minembed)
            });
            }
            if(args[0] == `moderation`){
                fs.readdir(path.join(__dirname, '..', `Moderation`), (err1, files1, dir) => {
                    const cmd = files1.map(file => `\`${file}\``)
                const modembed = new Discord.MessageEmbed()
                .setTitle(`🔧Moderation commands`)
                .setDescription(`${cmd.toString()
                .replace(/[{()}]/g, '')
                .replace(/.js/g, '')
                .replace(/,/g, ', ')}`)
                .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
                return message.channel.send(modembed)
                });
                }
                if(args[0] == `music`){
                    fs.readdir(path.join(__dirname, '..', `Music`), (err1, files1, dir) => {
                        const cmd = files1.map(file => `\`${file}\``)
                    const musicembed = new Discord.MessageEmbed()
                    .setTitle(`🎶Music commands`)
                    .setDescription(`${cmd.toString()
                    .replace(/[{()}]/g, '')
                    .replace(/.js/g, '')
                    .replace(/,/g, ', ')}`)
                    .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
                    return message.channel.send(musicembed)
                    });
                    }
                    if(args[0] == `Misc`){
                        fs.readdir(path.join(__dirname, '..', `Misc`), (err1, files1, dir) => {
                            const cmd = files1.map(file => `\`${file}\``)
                        const Miscembed = new Discord.MessageEmbed()
                        .setTitle(`💡Misc commands`)
                        .setDescription(`${cmd.toString()
                        .replace(/[{()}]/g, '')
                        .replace(/.js/g, '')
                        .replace(/,/g, ', ')}`)
                        .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
                        return message.channel.send(Miscembed)
                        });
                        }
                        if(args[0] == `Fun`){
                            fs.readdir(path.join(__dirname, '..', `Fun`), (err1, files1, dir) => {
                                const cmd = files1.map(file => `\`${file}\``)
                            const Funembed = new Discord.MessageEmbed()
                            .setTitle(`😄Fun commands`)
                            .setDescription(`${cmd.toString()
                            .replace(/[{()}]/g, '')
                            .replace(/.js/g, '')
                            .replace(/,/g, ', ')}`)
                            .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
                            return message.channel.send(Funembed)
                            });
                            }
                            if(args[0] == `Economy`){
                                fs.readdir(path.join(__dirname, '..', `Economy`), (err1, files1, dir) => {
                                    const cmd = files1.map(file => `\`${file}\``)
                                const ecoembed = new Discord.MessageEmbed()
                                .setTitle(`💰Economy commands`)
                                .setDescription(`${cmd.toString()
                                .replace(/[{()}]/g, '')
                                .replace(/.js/g, '')
                                .replace(/,/g, ', ')}`)
                                .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
                                return message.channel.send(ecoembed)
                                });
                                }
                                if(args[0] == `Minecraft`){
                                    fs.readdir(path.join(__dirname, '..', `Minecraft`), (err1, files1, dir) => {
                                        const cmd = files1.map(file => `\`${file}\``)
                                    const minembed = new Discord.MessageEmbed()
                                    .setTitle(`<:Minecraft:823941357872873472>Minecraft commands`)
                                    .setDescription(`${cmd.toString()
                                    .replace(/[{()}]/g, '')
                                    .replace(/.js/g, '')
                                    .replace(/,/g, ', ')}`)
                                    .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
                                    return message.channel.send(minembed)
                                    });
                                    }
                                    if(args[0] == `Moderation`){
                                        fs.readdir(path.join(__dirname, '..', `Moderation`), (err1, files1, dir) => {
                                            const cmd = files1.map(file => `\`${file}\``)
                                        const modembed = new Discord.MessageEmbed()
                                        .setTitle(`🔧Moderation commands`)
                                        .setDescription(`${cmd.toString()
                                        .replace(/[{()}]/g, '')
                                        .replace(/.js/g, '')
                                        .replace(/,/g, ', ')}`)
                                        .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
                                        return message.channel.send(modembed)
                                        });
                                        }
                                        if(args[0] == `Music`){
                                            fs.readdir(path.join(__dirname, '..', `Music`), (err1, files1, dir) => {
                                                const cmd = files1.map(file => `\`${file}\``)
                                            const musicembed = new Discord.MessageEmbed()
                                            .setTitle(`🎶Music commands`)
                                            .setDescription(`${cmd.toString()
                                            .replace(/[{()}]/g, '')
                                            .replace(/.js/g, '')
                                            .replace(/,/g, ', ')}`)
                                            .setFooter(`remeber to use \`${settings.prefix}\` befor every command`)
                                            return message.channel.send(musicembed)
                                            });
                                            }
const data = [];
const { commands } = message.client;
const name = args[0].toLowerCase();
const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
if (!command) {
    return 
}
data.push(`**Name:** ${command.name}`);
if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.description) data.push(`**Description:** ${command.description}`);
if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
message.channel.send(data, { split: true });
}

}
