
const Discord = require('discord.js');
const colors = require('../../colors.json');
const MessageAttachment = require('discord.js')

module.exports = {
    name: 'player',
    aliases: ['profile'],
    async execute(message,args, cmd, client, Discord){
        try{

        }catch(err){

        }

        if (!args.length) return message.reply('Please provide a valid playername as a parameter.');
try{
    var dFetch = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
}catch (err) {
    message.channel.send(`player \`${args[0]}\` does not exist`)
}
        
        const data = await dFetch.json();
        const dFetch1 = await fetch(`https://api.slothpixel.me/api/players/${args[0]}/status`);
        const mcskin = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${data.uuid}`)
        const mcdata = await mcskin.json();
        const data1 = await dFetch1.json();
        const guild = await fetch(`https://api.hypixel.net/findGuild?key=43bd6d1a-3305-4eae-9e3b-fe47222fe338&byUuid=${data.uuid}`)
        const guilddata = await guild.json();
        const guilddataid = await fetch(`https://api.hypixel.net/guild?key=43bd6d1a-3305-4eae-9e3b-fe47222fe338&id=${guilddata.guild}`)
        const guildstat = await guilddataid.json();

        if (data.error && data.error == 'Player does not exist') return message.reply('That player does not exist.');
try{
    const head = `http://cravatar.eu/helmavatar/${args[0]}.png`
        var embed = new Discord.MessageEmbed();
        embed.setDescription(`[${data.username}](https://plancke.io/hypixel/player/stats/${args[0]})`);
        embed.setThumbnail(`https://cravatar.eu/helmhead/${args[0]}.png`)
        embed.setColor(data.online ? colors['Green'] : colors['Red']);
        embed.setImage('');
        embed.addFields({
            name: `**Online status:**`,
            value: `${data.online ? 'Online' : 'Offline'}`,
            inline: true
        }, {
            name: '**Level:**',
            value: `${data.level.toFixed(0)}`,
            inline: true
        }, {
            name: '**MC Version:**',
            value: `${data.mc_version}`,
            inline: true
        }, {
            name: '**Last game played:**',
            value: `${data.last_game}`,
            inline: true
        }, {
            name: '**Rank:**',
            value: `${data.rank.toString()
                .replace(/NULL/g, 'NON')
                .replace(/VIP_PLUS/g, 'vip+')
                .replace(/VIP/g, 'vip')
                .replace(/MVP_PLUS_PLUS/g, 'mvp++')
                .replace(/MVP_PLUS/g, 'mvp+')
                .replace(/MVP/g, 'mvp')
                .replace(/ADMIN/g, 'admin')
                .replace(/YOUTUBER/g, 'youtuber')
                }`,
            inline: true
        },)
    }
        catch(err) {
            var embed = new Discord.MessageEmbed();
        embed.setDescription(`[${data.username}](https://plancke.io/hypixel/player/stats/${args[0]})`);
        embed.setThumbnail(`https://cravatar.eu/helmhead/${args[0]}.png`)
        embed.setColor(data.online ? colors['Green'] : colors['Red']);
        embed.setImage('');
        embed.addFields({
            name: `**Online status:**`,
            value: `${data.online ? 'Online' : 'Offline'}`,
            inline: true
        }, {
            name: '**Level:**',
            value: `${data.level.toFixed(0)}`,
            inline: true
        }, {
            name: '**MC Version:**',
            value: `${data.mc_version}`,
            inline: true
        }, {
            name: '**Last game played:**',
            value: `${data.last_game}`,
            inline: true
        }, {
            name: '**Rank:**',
            value: `non`,
            inline: true
        },)

        }

        if(data1.game.type != null) embed.addField('**Currently playing:**', `**Type:** ${data1.game.type}\n**Mode:** ${data1.game.mode}\n**Map:** ${data1.game.map}`);
        if(guildstat.success == true) embed.addField('**Guild:**', `${guildstat.guild.name_lower}`, true)
        message.channel.send(embed);
        

    },
    help: 'Sends you the statistics of a specified player.'
}