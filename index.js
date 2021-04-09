const { Collection } = require("discord.js");
const config = require('./config.json');
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const mongoose = require('mongoose');
require('dotenv').config();
const DisTube = require('distube')
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
const DBL = require('dblapi.js')
const dbl = new DBL(config.DBL_TOKEN, { webhookPort: 5000, webhookAuth: config.AUTH_PASS });
dbl.webhook.on('vote', vote => {
  console.log(`User with ID ${vote.user} just voted!`);
});

var used1 = false;
client.on("ready", () => {

  setInterval(() => {
    if (used1) {
      client.user.setActivity("https://octbot.ml/", {
        type: "PLAYING",
        status: "ONLINE",
      });
      used1 = false;
    } else {
      client.user.setActivity(`games on ${client.guilds.cache.size} servers`, {
        type: "PLAYING",
      });
      used1 = true;
    }
  }, 3000);
});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord)
})

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(()=> console.log('Connected to MongoDB!'))
  .catch((error) => console.error(error));

  client.distube
    .on("playSong", (message, queue, song) => {
      let mode = client.distube.toggleAutoplay(message);
      const playing = new Discord.MessageEmbed()
      .setTitle('🎶 Now Playing')
      .setDescription(`[${song.name}](${song.url})

      Duration: \`${song.formattedDuration}\` | Filters: \`${queue.filter || "Off"}\` | AutoPlay: | \`${(mode ? "On" : "Off")}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Volume: \`${queue.volume}%\``)
      .setThumbnail(song.thumbnail)
      .setColor("BLUE")
      message.channel.send(playing)
    })
    .on("addSong", (message, queue, song) => {
      let mode = client.distube.toggleAutoplay(message);
      const playing = new Discord.MessageEmbed()
      .setTitle('New song added to queue 👍')
      .setDescription(`[${song.name}](${song.url})

      Duration: \`${song.formattedDuration}\` | Filters: \`${queue.filter || "Off"}\` | AutoPlay: | \`${(mode ? "On" : "Off")}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Volume: \`${queue.volume}%\``)
      .setThumbnail(song.thumbnail)
      .setColor("BLUE")
      message.channel.send(playing)
    })
    .on("playList", (message, queue, playlist, song) => {message.channel.send(
      `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    )})
  .on("addList", (message, queue, playlist) => message.channel.send(
      `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
  ))

client.login(process.env.token);
