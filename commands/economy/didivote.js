module.exports = {
    name: 'didivote',
    async execute(message, args, cmd, client){
        const Discord = require('discord.js')
        const Topgg = require('@top-gg/sdk')
        const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0MTc3NjQ3MzYxMzkyNjQ5MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE3NjQ3NTEwfQ.x80_MtabwYpjf5egoAaIxs41pDDm-l0WXoazxdpM2dA')
        let voted = await api.hasVoted(message.author.id || message.mentions.users.first().id)
        if(!voted){
            const notvoted = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`You haven't voted`)
            .setDescription(`You can vote for me by clicking [here](https://top.gg/bot/741776473613926490/vote)
            voting for oct bot will get you free rewards such as coins and lootboxes!`)
            .setFooter('You can also vote by goind to top.gg website and searching "oct bot"')
            return message.channel.send(notvoted)
        }
        if(voted){
            const voted = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle('You have voted!')
            .setDescription('once you have voted you should of gotten a message from me with the rewards ')
            .setFooter("you can also check votes by joining our server")
            return message.channel.send(voted)
        }
    }
}