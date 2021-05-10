module.exports = {
    name:'join',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        const channel = client.channels.cache.get(message.member.voice.channel.id);
        if (!channel) return message.channel.send("You must be in a voice channel to use this command.");
        channel.join().then(channel =>{
            const channeljoined = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle(`Successfully Joined ${channel.channel.name}`)
            .setDescription(`Channel Name: \`${channel.channel.name}\`
            Channel ID: \`${channel.channel.id}\`
            Joined from: ${message.channel}`)
            .setFooter('Try playing some music to unlock all the features!')
            message.channel.send(channeljoined)
        })
    }
}