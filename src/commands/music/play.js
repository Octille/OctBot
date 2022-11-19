const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays music')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Input song title.')
                .setRequired(true)),

	async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel
        if (!interaction.member.voice.channel) return interaction.reply('**You must be in a voice channel to use this command!**');
        const song = interaction.options.getString('query');
        const searchingSong = `🔎 searching \`${song}\``
        const message = await interaction.reply({
            fetchReply: true,
            content: searchingSong
        })

        if (!song) {
            interaction.reply('Please type a song title.')
        }
        client.distube.play(voiceChannel, song,{
            member: message.member,
            textChannel: message.channel,
        }).catch(err => {
            console.error(err)
            return interaction.reply(`❌No results found for \`${song}\`!`)
            
        })

        
	},
}