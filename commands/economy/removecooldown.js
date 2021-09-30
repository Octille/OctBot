const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'removecooldown',
    description: 'rcd',
    aliases: ['rd'],
    async execute(message, args, cmd, client, Discord) {
        if (message.member.id != "460509056487129090") return message.channel.send(`Sorry only **Oct** can run this command 😔`);
        const user = message.mentions.users.first().id || message.author.id;
        const cooldown = args[1]
        
        await profileModel.findOneAndUpdate(
            {
              userID: user,
            },
            {
              $pull:{
                commands_cooldowns: {
                  name: cooldown,
                }
              }
       
            }
          )
          const data = profileModel.findOne(
            {
              userID: user,
            },
            )
          return message.channel.send(`Removed cooldown \`${cooldown}\` for ${message.mentions.users.first() || message.author}`)
    }

}