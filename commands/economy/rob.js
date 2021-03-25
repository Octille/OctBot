const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'rob',
    description: '',
    cooldown: 60,
    async execute(message, args, cmd, client, Discord) {
        
        
        let profileData;
        profileData = await profileModel.findOne({ userID: message.author.id })
        const mentionedprofile = await profileModel.findOne({ userID: message.mentions.users.first().id })
        const user = message.author;
        const mentioned = message.mentions.users.first().id;
        if(profileData.coins <1000){
            return message.channel.send(`${user} you need **₪ 1000** coins to rob someone`)
        }
        if(mentionedprofile.coins < 1000){
            return message.channel.send(`${message.mentions.users.first()} needs at least **₪ 1000** coins in the wallet`)
        }
        const mentionedData = await profileModel.findOne({ userID: mentioned })
        const robamount = mentionedData.coins * .1
        var d = Math.random();
if (d < 0.5)
{
const loss = await profileModel.findOneAndUpdate(
    {
        userID: message.mentions.users.first().id

    },
    {
    $inc:{
            coins: -robamount
    }
    },
)
const gain = await profileModel.findOneAndUpdate(
    {
      userID: message.author.id,
    },
    {
      $inc : {
        coins: robamount,
      },
    }
  );

return message.channel.send(`You just robbed ${message.mentions.users.first()} for **₪ ${robamount}**`)
}

    
else if (d < 0.7)
    {
await profileModel.findOneAndUpdate(
        {
            userID: message.mentions.users.first().id
    
        },
        {
        $inc:{
                coins: 1000,
        }
        },
    )
profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc : {
            coins: -1000,
          },
        }
      );
return message.channel.send(`You were about to rob ${message.mentions.users.first()} but you were cought, paying him **₪ 1000**`)
}
    }

}