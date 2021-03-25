module.exports = {
    name: 'restart',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        client.distube.seek(message, Number(1))
        message.channel.send(`successfully restarted the song`)
    }
}