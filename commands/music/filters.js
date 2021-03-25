module.exports = {
    name: `filters`,
    aliases: ["filter"],
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
            const queue = client.distube.getQueue(message)
    
         
            const MessageEmbed = require('discord.js');
            const emptyQueueEmbed = new Discord.MessageEmbed()
            .setTitle("The Queue appears to be empty.")
            .setColor("BLUE")
            .setDescription("Try playing a song then utilizing ths command.")
            .addField('Please choose from the following list.',"`off`\n`3d`\n`bassboost`\n`echo`\n`karaoke`\n`nighcore`\n`vaporwave`\n`flanger`\n`gate`\n`haas`\n`reverse`\n`surround`\n`mcompand`\n`phaser`\n`tremolo`\n`earwax`")
        
    
            const invalidFilter = new Discord.MessageEmbed()
            .setTitle("That is not a valid filter.")
            .addField('Please choose from the following list.', "`3d`\n`bassboost`\n`echo`\n`karaoke`\n`nighcore`\n`vaporwave`\n`flanger`\n`gate`\n`haas`\n`reverse`\n`surround`\n`mcompand`\n`phaser`\n`tremolo`\n`earwax`")
            //"3d" | "bassboost" | "echo" | "karaoke" | "nightcore" | "vaporwave" | "flanger" | "gate" | "haas" | "reverse" | "surround" | "mcompand" | "phaser" | "tremolo" | "earwax"
            .setColor("BLUE")

            
            if (!queue) return message.channel.send(emptyQueueEmbed)
            if (args[0] === "off" && queue.filter) client.distube.setFilter(message, queue.filter)
            else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(message, args[0])
            else if (args[0]) return message.channel.send(invalidFilter)
            message.channel.send(`Current Queue Filter: \`${queue.filter || "Off"}\``)
    }
}