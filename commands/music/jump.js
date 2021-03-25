module.exports = {
    name: 'jump',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        const queue = client.distube.getQueue(message)



        const emptyQueueEmbed = new Discord.MessageEmbed()
        .setTitle("Empty queue")
        .setColor("RED")
        .setDescription("oops looks like theres nothing in the queue")
        .setFooter(`try playing some music then use this command`)
        
        const invalidSong = new Discord.MessageEmbed()
        .setTitle(`no song in queue numbered \`${args.join(" ")}\``)
        .setColor("RED")
        .setDescription("Try playing a song then utilizing ths command.")


        if(isNaN(args[0])){
            return message.channel.send(invalidSong)
        }

        if (!queue) return message.channel.send(emptyQueueEmbed)

        try{
        client.distube.jump(message, Number(args[0]));
        }catch{
            message.channel.send(invalidSong)
        }
    }
}