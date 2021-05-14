const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'cooldown',
    description: 'rcd',
    aliases: ['rd'],
    async execute(message, args, cmd, client, Discord) {
        if (message.member.id != "460509056487129090") return message.channel.send(`Sorry only **Gurkirat** can run this command 😔`);
        const user = message.mentions.users.first().id || message.author.id;
        if(!user) return message.channel.send('please provid a person')
        if(args[0] === 'disable'){
            await profileModel.findOneAndUpdate(
                {
                  userID: user,
                },
                {
                  $set:{
                    cooldownenabled: 1,
                  }
           
                }
              )
              return message.channel.send(`Disabled cooldowns for ${message.mentions.users.first() || message.author}`)
        }
        if(args[0] === 'enable'){
            await profileModel.findOneAndUpdate(
                {
                  userID: user,
                },
                {
                  $set:{
                    cooldownenabled: 0,
                  }
           
                }
              )
              return message.channel.send(`Enabled cooldowns for ${message.mentions.users.first() || message.author}`)
        }
    }

}