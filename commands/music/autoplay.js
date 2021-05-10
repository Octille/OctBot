module.exports = {
    name: 'autoplay',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        let mode = client.distube.toggleAutoplay(message);
        message.channel.send("Autoplay mode has been to `" + (mode ? "On" : "Off") + "`");
    }
}