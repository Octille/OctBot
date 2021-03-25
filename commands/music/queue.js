const { promptMessage } = require("../../functions");
module.exports = {
    name: 'queue',
    aliases: ["q"],
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('You must be in a voice channel to use this command.');
        
        try{
        let mode = client.distube.toggleAutoplay(message);
        const channel = message.channel.id
        const queue = client.distube.getQueue(message)
    
            const q = queue.songs.map((song, i) => `${i === 0 ? "Now Playing:" : `${i}.`} [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n\n")
   
        const queueembed = new Discord.MessageEmbed()
        .setTitle(`**${message.guild}'s** queue`)
        .setDescription(q)
        .addField(`Filters: \`${queue.filter || "Off"}\` | AutoPlay: | \`${(mode ? "On" : "Off")}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Volume: \`${queue.volume}%\``, `_ _`)
        .setColor("BLUE")
        message.channel.send(queueembed).then(async msg => {
            try {
                await msg.react('⏩');
                await msg.react('⏯️');
                await msg.react('⏸️');
                await msg.react('🔀');
                await msg.react('🔁');
                await msg.react('🔉')
                await msg.react('🔊')
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
            const unpause = '⏯️'
            const skip = '⏩'
            const pause = '⏸️'
            const shuffle = '🔀'
            const loop = '🔁'
            const volumedown = '🔉'
            const volumeup = '🔊'
            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === skip) {
                        reaction.users.remove(user.id);
                        await client.distube.skip(message);
                    }
                    if (reaction.emoji.name === pause) {
                        reaction.users.remove(user.id);
                        await client.distube.pause(message);
                        message.channel.send('song is now unpaused')
                    }
                    if (reaction.emoji.name === unpause) {
                        reaction.users.remove(user.id);
                        await client.distube.resume(message);
                        message.channel.send('song is now paused')
                    }
                    if (reaction.emoji.name === shuffle) {
                        reaction.users.remove(user.id);
                        await client.distube.shuffle(message);
                        message.channel.send('now shuffling queue');
                    }
                    if (reaction.emoji.name === loop) {
                        reaction.users.remove(user.id);
                        mode = client.distube.setRepeatMode(message, parseInt(args[0]));
                        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
                        message.channel.send("Set repeat mode to `" + mode + "`");
                    }
                    if (reaction.emoji.name === volumedown) {
                        if(queue.volume == '0') return;
                        if(queue.volume == '500') return;
                        reaction.users.remove(user.id);
                        client.distube.setVolume(message, queue.volume-10);
                    }
                    if (reaction.emoji.name === volumeup) {
                        if(queue.volume == '0') return;
                        if(queue.volume == '500') return;
                        reaction.users.remove(user.id);
                        client.distube.setVolume(message, queue.volume+10);
                    }
                } else {
                    return;
                }
     
            });
        });
    }catch(err){
        return message.channel.send('No song is currently playing!')
    }

    }

}