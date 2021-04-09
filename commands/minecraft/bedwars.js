const Discord = require('discord.js');
const colors = require('../../colors.json');
const fetch = require('cross-fetch');

module.exports = {
    name: 'bedwars',
    aliases: ['bw'],
    description: 'shows bedwars stats',
    async execute(message,args, cmd, client, Discord){

        if(!args.length) return message.reply('Please provide a valid playername as a parameter.');

        const dFetch = await fetch(`https://api.slothpixel.me/api/players/${args[0]}`);
        const data = await dFetch.json();


        if(data.error && data.error == 'Player does not exist') return message.reply('That player does not exist.');

        const bedwars = data['stats']['BedWars'];
        const gamemodes = bedwars['gamemodes'];
        const solo = gamemodes.solo;
        const doubles = gamemodes.doubles;
        const threes = gamemodes['3v3v3v3'];
        const fours = gamemodes['4v4v4v4'];

        const overallData = [
            `**Level (Star):** ${bedwars.level}`,
            `**Coins:** ${bedwars.coins}`,
            `**Overall wins:** ${bedwars.wins}`,
            `**Overall losses:** ${bedwars.losses}`,
            `**Overall Games Played:** ${bedwars.games_played}`,
            `**Overall winstreak:** ${bedwars.winstreak}`,
            `**Overall beds broken:** ${bedwars.beds_broken}`,
            `**Overall beds lost:** ${bedwars.beds_lost}`,
            `**Final kills:** ${bedwars.final_kills}`,
            `**Final Deaths:** ${bedwars.final_deaths}`
        ]
        const soloData = [
            `**Winstreak:** ${solo.winstreak}`,
            `**Items purchased:** ${solo.items_purchased}`,
            `**Deaths:** ${solo.deaths}`,
            `**Games played:** ${solo.games_played}`,
            `**Beds lost:** ${solo.beds_lost}`,
            `**Losses:** ${solo.losses}`,
            `**Final deaths:** ${solo.final_deaths}`,
            `**Kills:** ${solo.kills}`,
        ]
        const doublesData = [
            `**Winstreak:** ${doubles.winstreak}`,
            `**Items purchased:** ${doubles.items_purchased}`,
            `**Deaths:** ${doubles.deaths}`,
            `**Games played:** ${doubles.games_played}`,
            `**Beds lost:** ${doubles.beds_lost}`,
            `**Losses:** ${doubles.losses}`,
            `**Final deaths:** ${doubles.final_deaths}`,
            `**Kills:** ${doubles.kills}`,
        ]
        const threesData = [
            `**Winstreak:** ${threes.winstreak}`,
            `**Items purchased:** ${threes.items_purchased}`,
            `**Deaths:** ${threes.deaths}`,
            `**Games played:** ${threes.games_played}`,
            `**Beds lost:** ${threes.beds_lost}`,
            `**Losses:** ${threes.losses}`,
            `**Final deaths:** ${threes.final_deaths}`,
            `**Kills:** ${threes.kills}`,
        ]
        const foursData = [
            `**Winstreak:** ${fours.winstreak}`,
            `**Items purchased:** ${fours.items_purchased}`,
            `**Deaths:** ${fours.deaths}`,
            `**Games played:** ${fours.games_played}`,
            `**Beds lost:** ${fours.beds_lost}`,
            `**Losses:** ${fours.losses}`,
            `**Final deaths:** ${fours.final_deaths}`,
            `**Kills:** ${fours.kills}`,
        ]

        const embed = new Discord.MessageEmbed();
        embed.setTitle(`BedWars stats of ${data.username}`);
        embed.setColor(colors['MainColor'])
        embed.addFields({
            name: `Overall:`,
            value: overallData.join('\n'),
            inline: true
        }, {
            name: 'Solo',
            value: soloData.join('\n'),
            inline: true
        }, {
            name: 'Doubles',
            value: doublesData.join('\n'),
            inline: true
        }, {
            name: '3v3v3v3',
            value: threesData.join('\n'),
            inline: true
        }, {
            name: '4v4v4v4',
            value: foursData.join('\n'),
            inline: true
        })

        message.channel.send(embed);

    },
    help: 'Sends the statistics of a BedWars player.'
}
