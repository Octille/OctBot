const profileModel = require("../../models/profileSchema");
const Discord = require("discord.js")
module.exports = {
    name: 'heist',
    async execute(message, args, cmd, client, discord, profileData, settings){

      if(!args[0]){
          const noargsembed = new Discord.MessageEmbed()
          .setTitle("Heist")
          .setColor("BLUE")
          .addField(`🏦 Bank`, `\nTake: ** ₪ 1m**\n Exp: **500**\n Booster: 0.5%\nLevel requirement: **0**\nEquipment: **none**`, true)
          .addField(`🏛️ Museum`, `\nTake: ** ₪ 5m**\n Exp: **2500**\n Booster: 5%\nLevel requirement: **5**\nEquipment: 🥽**Night Goggles** `, true)
          .setFooter(`Your level: 0\nStart a heist by doing ${settings.prefix}heist start (heist name)`)
          
          return message.channel.send(noargsembed)
      }
      if(args[0] == 'start'){
          if(!args[1]) return message.channel.send("Please provide a heist!")
          if(args[1] == 'bank'){

          }
          
      }

    }
}