module.exports = {
    name: `filters`,
    aliases: ["filter"],
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
            const queue = client.distube.getQueue(message)
    
         
            const MessageEmbed = require('discord.js');
            const emptyQueueEmbed = new Discord.MessageEmbed()
            .setTitle("Empty queue")
            .setColor("BLUE")
            .setDescription(`There is no song currently playing on\n\`${message.guild.name}\``)
            .setFooter(`Play some music to use this command!`)
            if (!queue) return message.channel.send(emptyQueueEmbed)  
    
            const invalidFilter = new Discord.MessageEmbed()
            .setTitle("That is not a valid filter.")
            .addField('Please choose from the following list.', "`3d`\n`bassboost`\n`echo`\n`karaoke`\n`nighcore`\n`vaporwave`\n`flanger`\n`gate`\n`haas`\n`reverse`\n`surround`\n`mcompand`\n`phaser`\n`tremolo`\n`earwax`")
            //"3d" | "bassboost" | "echo" | "karaoke" | "nightcore" | "vaporwave" | "flanger" | "gate" | "haas" | "reverse" | "surround" | "mcompand" | "phaser" | "tremolo" | "earwax"
            .setDescription(`Current Queue Filter: \`${queue.filter || "Off"}\``)
            .setColor("BLUE")

            const noargs = new Discord.MessageEmbed()
            .setTitle("No filter provided")
            .addField('Please choose from the following list.', "`3d`\n`bassboost`\n`echo`\n`karaoke`\n`nighcore`\n`vaporwave`\n`flanger`\n`gate`\n`haas`\n`reverse`\n`surround`\n`mcompand`\n`phaser`\n`tremolo`\n`earwax`")
            //"3d" | "bassboost" | "echo" | "karaoke" | "nightcore" | "vaporwave" | "flanger" | "gate" | "haas" | "reverse" | "surround" | "mcompand" | "phaser" | "tremolo" | "earwax"
            .setDescription(`Current Queue Filter: \`${queue.filter || "Off"}\``)
            .setColor("BLUE")

            

            if(!args[0]) return message.channel.send(noargs)
            try{
                client.distube.setFilter(message, args[0])
                message.channel.send(`Queue filter has been set to \`${queue.filter || "Off"}\``)
            }catch(e){
                message.channel.send(invalidFilter)
            }

    }
}