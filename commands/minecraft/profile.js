const Discord = require('discord.js');
const colors = require('../../colors.json');

module.exports = {
    name: 'player',
    aliases: ['profile'],
    async execute(message,args, cmd, client, Discord){

        if (!args.length) return message.reply('Please provide a valid playername as a parameter.');

        const dFetch = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
        const data = await dFetch.json();
        const dFetch1 = await fetch(`https://api.slothpixel.me/api/players/${args[0]}/status`);
        const data1 = await dFetch1.json();

        if (data.error && data.error == 'Player does not exist') return message.reply('That player does not exist.');

        const embed = new Discord.MessageEmbed();
        embed.setTitle(`${data.username}`);
        embed.setColor(data.online ? colors['Green'] : colors['Red']);
        embed.addFields({
            name: `**Online status:**`,
            value: `${data.online ? 'Online' : 'Offline'}`,
            inline: true
        }, {
            name: '**UUID:**',
            value: `${data.uuid}`,
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
        })

        if(data1.game.type != null) embed.addField('**Currently playing:**', `**Type:** ${data1.game.type}\n**Mode:** ${data1.game.mode}\n**Map:** ${data1.game.map}`);

        message.channel.send(embed);

    },
    help: 'Sends you the statistics of a specified player.'
}