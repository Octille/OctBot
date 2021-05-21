module.exports = {
    name: 'lyrics',
    async execute(message,args, cmd, client, Discord){
        const queue = client.distube.getQueue(message);
        if(!queue){
            const emptyQueueEmbed = new Discord.MessageEmbed()
            .setTitle("Empty queue")
            .setColor("BLUE")
            .setDescription(`There is no song currently playing on\n\`${message.guild.name}\``)
            .setFooter(`Play some music to use this command!`)
            return message.channel.send(emptyQueueEmbed)
        }

        const songtitle = queue.songs.map((song, i) => 
        song.name
    )
    const songauthor = queue.songs.map((song, i) => 
    song.info.videoDetails.ownerChannelName
)

        const lyricsFinder = require('lyrics-finder');
        (async function(artist, title) {
            let lyrics = await lyricsFinder(artist, title) || "Not Found!";
            message.channel.send(lyrics)
        })(`${songauthor[0]}`, `${songtitle[0]}`);
    }
}