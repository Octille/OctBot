const Discord = require('discord.js');
const colors = require('../../colors.json');
const fetch = require('cross-fetch');

module.exports = {
    name: 'namehistory',
    aliases: ['nh'],
    notReady: true,
    async execute(message,args, cmd, client, Discord){

        const playerUUIDFetch = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`);
        const playerUUIDData = await playerUUIDFetch.json();
        const playerNameHistory = await fetch(`https://api.mojang.com/user/profiles/${playerUUIDData.id}/names`);
        const playerNameData = await playerNameHistory.json();

        let embed = new Discord.MessageEmbed()
            .setTitle(`${playerNameData[playerNameData.length - 1].name}'s Name History`)
            .setColor(colors['MainColor'])
            .setFooter('The list goes from\nTop is oldest name\nBottom is most recent name')

        for(length in playerNameData) {
            for(key in playerNameData[length]) {
                if(key == 'name') {
                    embed.addField(key, playerNameData[length][key])
                }
            }
        }

        message.channel.send(embed);
    }
}