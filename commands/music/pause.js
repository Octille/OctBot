module.exports = {
    name: 'pause',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        const queue = client.distube.getQueue(message);
        if(!queue){
            const emptyQueueEmbed = new Discord.MessageEmbed()
            .setTitle("Empty queue")
            .setColor("BLUE")
            .setDescription(`There is no song currently playing on\n\`${message.guild.name}\``)
            .setFooter(`Play some music to use this command!`)
            return message.channel.send(emptyQueueEmbed)
        }
        await client.distube.pause(message);
        message.channel.send('The server queue has been paused.')

    }
}