module.exports = {
    name: 'resume',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        await client.distube.resume(message);
        message.channel.send('queue has been resumed')

    }
}