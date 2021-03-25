module.exports = {
    name: 'loop',
    async execute(message, args, cmd, client, Discord, profileData, settings){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        try{
            let mode = client.distube.setRepeatMode(message, parseInt(args[0]));
            mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
            message.channel.send("Set repeat mode to `" + mode + "`");
        }catch(e){
            const messageembed = new Discord.MessageEmbed()
            .setTitle(`please choose a valid option from the list below`)
            .setDescription(`\`${settings.prefix}loop off\`
            \`${settings.prefix}loop This Song\`
            \`${settings.prefix}loop queue\``)
            
            message.channel.send(messageembed)
        }
        
    }
}