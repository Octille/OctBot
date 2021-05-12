module.exports = {
    name:'leave',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        const channel = client.channels.cache.get(message.member.voice.channel.id);
        try {
            channel.leave()
                const channeljoined = new Discord.MessageEmbed()
                .setColor("2F3136")
                .setTitle(`Successfully Left`)
                .setDescription(`Channel Name: \`${channel.name}\`
                Channel ID: \`${channel.id}\``)
                .setFooter('Goodbye!')
                message.channel.send(channeljoined)
            
        }catch (err){
            console.error(err)
            message.channel.send("**Please join the same voice channel as me to use this command.**")
        }

    }
}