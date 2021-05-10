module.exports = {
    name: 'loop',
    async execute(message, args, cmd, client, Discord, profileData, settings){
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        try{
            let mode = client.distube.setRepeatMode(message, parseInt(args[0]));
            mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
            message.channel.send("Reapet mode has been set to `" + mode + "`");
        }catch(e){
            const emptyQueueEmbed = new Discord.MessageEmbed()
            .setTitle("Empty queue")
            .setColor("BLUE")
            .setDescription(`There is no song currently playing on\n\`${message.guild.name}\``)
            .setFooter(`Play some music to use this command!`)
            message.channel.send(emptyQueueEmbed)
        }
        
    }
}