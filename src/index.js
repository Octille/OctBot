require("dotenv").config();
const { token } = process.env;
const { connect } = require("mongoose")
const { Client, Collection, GatewayIntentBits, EmbedBuilder, Partials } = require("discord.js");
const fs = require("fs");

const client = new Client({   intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessageReactions
],
partials: [
  Partials.Message, 
  Partials.Channel, 
  Partials.Reaction
], 
restTimeOffset: 1
});

const { DisTube } = require('distube')
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();

client.distube
.on("playSong", (queue, song) => {



  const playing = new EmbedBuilder()
  .setTitle('🎶 Now Playing')
  .setDescription(`[${song.name}](${song.url})

  Duration: \`${song.formattedDuration}\` | Filters: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Volume: \`${queue.volume}%\``)
  .setThumbnail(song.thumbnail)
  .setColor("BLUE")
  queue.textChannel.send({ embeds: [playing] })
})
.on("addSong", (queue, song) => {

  const playing = new EmbedBuilder()
  .setTitle('New song added to queue 👍')
  .setDescription(`[${song.name}](${song.url})

  Duration: \`${song.formattedDuration}\` | Filters: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Volume: \`${queue.volume}%\``)
  .setThumbnail(song.thumbnail)
  .setColor("BLUE")
  queue.textChannel.send({ embeds: [playing] })
})
.on("playList", (queue, playlist, song) => {queue.textChannel.send(`playing playlist`)})
.on("addList", (queue, playlist) => queue.textChannel.send(
  `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
))



client.login(token);
(async () => {
  connect(process.env.MONGODB_SRV).catch(console.error)
})();
