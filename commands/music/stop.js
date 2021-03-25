module.exports = {
    name: 'stop',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        client.distube.stop(message);
        message.channel.send("Stopped the queue!");
    }
}