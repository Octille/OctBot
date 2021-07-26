const discord = require('discord.js')
const Discord = require("discord.js");

module.exports = {
  name: "avatar",
  description: "get a user's avatar",
  aliases: ['av'],
  async execute(message,args, cmd, client, Discord){
    const user = message.mentions.users.first() || message.author;
    const avatarURL = user.displayAvatarURL({ dynamic: true })
    

    const embed = new Discord.MessageEmbed()
      .setAuthor(`${user.username}'s avatar`, user.displayAvatarURL({ dynamic: true }))
      .setImage(`${avatarURL}?size=256`)
      .setColor("BLUE")

    message.channel.send(embed);
  },
};