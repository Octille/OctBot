module.exports = {
    name: 'volume',
    aliases: ["vol", "v"],
    async execute(message,args, cmd, client, Discord){  
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        const queue = client.distube.getQueue(message);
        if(!queue){
            const emptyQueueEmbed = new Discord.MessageEmbed()
            .setTitle("Empty queue")
            .setColor("BLUE")
            .setDescription(`There is no song currently playing on\n\`${message.guild.name}\``)
            .setFooter(`Play some music to use this command!`)
            return message.channel.send(emptyQueueEmbed)
        }
        if(isNaN(args[0])){
            const embed = new discord.MessageEmbed()
            .setTitle('please provide valid amount')
            .setDescription(`Current volume is \`${queue.volume}\``)
            return message.channel.send(embed)
        }
        if(args[0] > 500){
            return message.channel.send('Sorry but the max volume is 500%!')
        }
        if(args[0] < 0){
            return message.channel.send('Sorry but the min volume is 0%!')
        }
        client.distube.setVolume(message, args[0]);
        return message.channel.send(`The volume has been set to \`${args[0]}\!`)

    }
}