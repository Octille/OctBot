module.exports = {
    name: 'volume',
    aliases: ["vol", "v"],
    async execute(message,args, cmd, client, Discord){  
        const queue = client.distube.getQueue(message)
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        if(isNaN(args[0])){
            const embed = new discord.MessageEmbed()
            .setTitle('please provide valid amount')
            .setDescription(`Current volume is \`${queue.volume}\``)
            return message.channel.send(embed)
        }
        if(args[0] > 500){
            return message.channel.send('sorry but the max volume is 500%')
        }
        if(args[0] < 0){
            return message.channel.send('sorry but the min volume is 0%')
        }
        client.distube.setVolume(message, args[0]);
        return message.channel.send(`the volume has been set to \`${args[0]}\``)

    }
}