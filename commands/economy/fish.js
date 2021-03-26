const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'fish',
    description: '',
    cooldown: 45,
    aliases: ["f"],
    async execute(message, args, cmd, client, Discord, profileData, settings) {
      
      if(!profileData.Items.FishingRod){
        return message.channel.send(`looks like you dont have a fishing rod buy one from \`${settings.prefix}shop\``)
      }
      const randomfish = Math.floor(Math.random() * 3) + 1;


                  let fishes = [
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'common fish',
                    'rare fish',
                    'rare fish',
                    'rare fish',
                    'rare fish',
                    'rare fish',
                    'rare fish',
                    'rare fish',
                    'mythic fish',

                  ]
                  const fishescought = fishes[Math.floor(Math.random()*fishes.length)];
                  if(fishescought == "common fish"){
                  await profileModel.findOneAndUpdate(
                    {
                      userID: message.author.id,
                    },
                    {
                      $inc : {
                        "Items.CommonFish": randomfish,
                      },
                    }
                  );
                  }
                  if(fishescought == "rare fish"){
                    await profileModel.findOneAndUpdate(
                      {
                        userID: message.author.id,
                      },
                      {
                        $inc : {
                          "Items.RareFish": randomfish,
                        },
                      }
                    );
                    }
                    if(fishescought == "mythic fish"){
                      await profileModel.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $inc : {
                            "Items.MythicFish": randomfish,
                          },
                        }
                      );
                      }
                  
                   message.channel.send('fishing...').then((msg)=>{
      
                           
                          
                    
                          

                          //your code here! msg.edit will work here.
                      
                        setTimeout(() => {
                          
                          msg.edit(`caught \`${randomfish}\` ${fishescought}`);
                        }, 1000);
                      })
                      
  

}
}