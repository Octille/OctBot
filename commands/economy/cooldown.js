const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'cooldown',
    description: 'rcd',
    aliases: ['rd'],
    async execute(message, args, cmd, client, Discord) {
        if (message.member.id != "460509056487129090") return message.channel.send(`Sorry only **Gurkirat** can run this command 😔`);
        const user = message.mentions.users.first().id
        if(!user) return message.channel.send('please provid a person')
        const profileData = await profileModel.findOne(
          {
            userID: user,
          },
        )
  
        let enabled_disabled;

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
        console.log(profileData)
        if(profileData.cooldownenabled == '1'){
          enabled_disabled = 'disabled'
        }
        if(profileData.cooldownenabled == '0'){
          enabled_disabled = 'enabled'
      }
      if(!profileData.cooldownenabled){
        enabled_disabled = 'enabled'
    }
      return message.channel.send(`${message.mentions.users.first() || message.author} has cooldowns ${enabled_disabled}.`)
    }

}