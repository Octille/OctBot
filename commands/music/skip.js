module.exports = {
    name: 'skip',
    aliases: ["s"],
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        client.distube.skip(message);
        message.channel.send(`skiped video 👍`)

    }

}