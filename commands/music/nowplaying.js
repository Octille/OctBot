module.exports = {
    name: "nowplaying",
    aliases: ["np"],
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
        const q = queue.songs.map((song, i) => `[${song.name}](${song.url})
        \n👍\`${song.likes}\` | 👎\`${song.dislikes}\` | 👁️\`${song.views}\` | 🕒\`${song.formattedDuration}\``)
        let queuesong;
        queue.songs.map((song, i) => {
            queuesong = song;
        })
        const embed = new Discord.MessageEmbed()

        .setTitle('Now Playing')
        .setDescription(q)
        .setColor("BLUE")
        .setThumbnail(queuesong.thumbnail)
        .setFooter("Invite Oct Bot using octbot.ml/invite!")

        message.channel.send(embed)

    }
}