const Discord = require('discord.js');

module.exports = {
    name: 'uhc',
    async execute(message, args, client) {

        if (!args.length) return message.reply('Please provide a valid playername as a parameter.');

        const dFetch = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);

        const data = await dFetch.json();


        if (data.error && data.error == 'Player does not exist') return message.reply('That player does not exist.');

        const uhc = data.stats['UHC'];
        const gamemodes = uhc['gamemodes'];
        const solo = gamemodes.solo;
        
        const embed = new Discord.MessageEmbed();
        embed.setTitle(`UHC Champions statistic of ${data.username}`);
        embed.setColor("WHITE");

        const overallData = [
            `**Wins:** ${uhc.wins}`,
            `**Kills:** ${uhc.kills}`,
            `**Coins:** ${uhc.coins}`
        ]

        const soloData = [
            `**Wins:** ${solo.wins}`,
            `**Kills:** ${solo.kills}`,
            `**Heads eaten:** ${solo.heads_eaten}`
        ]

        embed.addFields({
            name: 'Overall',
            value: overallData.join('\n'),
            inline: true
        }, {
            name: 'Solo',
            value: soloData.join('\n'),
            inline: true
        })

        message.channel.send(embed);

    },
}