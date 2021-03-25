const discord = require('discord.js')
const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "get a user's avatar",
  aliases: ['av'],
  async execute(message,args, cmd, client, Discord){
    const user = message.mentions.users.first() || message.author;

    const embed = new Discord.MessageEmbed()
      .setTitle("Avatar Request : " + user.username)
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setColor("GREEN")

    message.channel.send(embed);
  },
};