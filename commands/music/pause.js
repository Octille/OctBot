module.exports = {
    name: 'pause',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        await client.distube.pause(message);
        message.channel.send('queue has been paused')

    }
}