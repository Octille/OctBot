module.exports = {
    name: 'seek',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        client.distube.seek(message, Number(args[0])).catch( err =>{
            message.channel.send('that timestamp doesnt exist')
        });
        message.channel.send(`successfully  skiped to \`${(args[0])}\``)
    }
}