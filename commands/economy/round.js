const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'round',
    async execute(message, args, cmd, client, discord, profileData){
      
        let amount = profileData.coins
 amount = (amount*1).toFixed();
 await profileModel.findOneAndUpdate(
    {
      userID: message.author.id,
    },
    {
      $set : {
        "coins": amount,
      },
    }
  );
  message.channel.send(`successfully rounded your coins to the nearest whole`)
  
    }
}