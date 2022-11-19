const { SlashCommandBuilder, EmbedBuilder, Events,} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Shows songs in queue'),
	async execute(interaction, client) {
        try{
            if (!interaction.member.voice.channel) return interaction.reply('**You must be in a voice channel to use this command!**');

            const channel = interaction.channel.id;
            const queue = client.distube.getQueue(interaction)
            let mode = client.distube.toggleAutoplay(interaction);
            const q = queue.songs.map((song, i) => `${i === 0 ? "Now Playing:" : `${i}.`} [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n\n")
            const info = `\n\nFilters: \`${queue.filter || "Off"}\` | AutoPlay: | \`${(mode ? "On" : "Off")}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Volume: \`${queue.volume}%\``
            const queueembed = new EmbedBuilder()
            .setTitle(`**${interaction.guild.name}'s** queue`)
            .setDescription(q+info)
            .setColor(0x0000FF)
            await interaction.reply({ embeds: [queueembed], fetchReply: true}).then(msg=>{
                        msg.react('⏩');
                        msg.react('⏯️');
                        msg.react('🔀');
                        msg.react('🔁');
                        msg.react('🔉');
                        msg.react('🔊');
                
                        const collector = msg.createReactionCollector()

                        collector.on('collect', async (reaction, user) => {

                            const unpause = '⏯️'
                            const skip = '⏩'
                            const shuffle = '🔀'
                            const loop = '🔁'
                            const volumedown = '🔉'
                            const volumeup = '🔊'
                            if (reaction.message.partial) await reaction.message.fetch();
                            if (reaction.partial) await reaction.fetch();
                            if (user.bot) return;

                 
                            if (reaction.message.channel.id == channel) {
                                if (reaction.emoji.name === skip) {
                                    reaction.users.remove(user.id);
                                    await client.distube.skip(interaction);
                                }
                                if (reaction.emoji.name === unpause) {
                                    try{
                                        reaction.users.remove(user.id);
                                        await client.distube.resume(interaction);
                                    }catch{
                                        reaction.users.remove(user.id);
                                        await client.distube.pause(interaction);
                                    }

                                }
                                if (reaction.emoji.name === shuffle) {
                                    reaction.users.remove(user.id);
                                    await client.distube.shuffle(interaction);
                                    interaction.channel.send('Shuffling queue.');
                                }
                                if (reaction.emoji.name === loop) {
                                    reaction.users.remove(user.id);
                                    mode = client.distube.setRepeatMode(interaction);
                                    mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
                                    interaction.channel.send("Set repeat mode to `" + mode + "`");
                                }
                                if (reaction.emoji.name === volumedown) {
                                    if(queue.volume == '0') return;
                                    if(queue.volume == '500') return;
                                    reaction.users.remove(user.id);
                                    client.distube.setVolume(interaction, queue.volume-10);
                                    interaction.channel.send(`Queue is now playing at \`${queue.volume}%\``)
                                }
                                if (reaction.emoji.name === volumeup) {
                                    if(queue.volume == '0') return;
                                    if(queue.volume == '500') return;
                                    reaction.users.remove(user.id);
                                    client.distube.setVolume(interaction, queue.volume+10);
                                    interaction.channel.send(`Queue is now playing at \`${queue.volume}%\``)
                                }
                            } else {
                                return;
                            }
                        });
            })


        }catch(err){
            const queue = client.distube.getQueue(interaction)
            if(!queue){
                const emptyQueueEmbed = new EmbedBuilder()
                .setTitle("Empty queue")
                .setColor(0x0000FF)
                .setDescription(`There is no song currently playing on\n\`${interaction.guild.name}\``)
                .setFooter(`Play some music to use this command!`)
                return interaction.reply({embeds: [emptyQueueEmbed]})
            }else{
                console.log(err);
            }
        }

        
	},
}