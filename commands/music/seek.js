module.exports = {
    name: 'seek',
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
        client.distube.seek(message, Number(args[0] * 1000)).catch( err =>{
            message.channel.send('Invalid timestamp.')
        });
        message.channel.send(`Successfully skiped to \`${(args[0])}\`!`)
    }
}