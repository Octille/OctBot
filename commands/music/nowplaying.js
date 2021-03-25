module.exports = {
    name: "nowplaying",
    aliases: ["np"],
    async execute(message,args, cmd, client, Discord){
        const queue = client.distube.getQueue(message)
        const q = queue.songs.map((song, i) => `${i === 0 ? "Now Playing:" : `${i}.`} [${song.name}](${song.url}) - \`${song.formattedDuration}\``)
        const embed = new Discord.MessageEmbed()
        .setTitle('Now Playing')
        .setDescription(q)
        .setThumbnail(queue.song.thumbnail)
        message.channel.send(embed)

    }
}