const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'sell',
    description: '',
    aliases: [" "],
    async execute(message, args, cmd, client, Discord, profileData) {
      
      try{
        if(!args[0]){
            return message.channel.send(`please provide something to sell`)
        }

        if(args[0]== "commonfish"){
          if(profileData.Items.CommonFish == 0 || profileData.Items.CommonFish < 0){
            return message.channel.send('you dont own that item!');
          }

          const amountedit = args[1]
          let amount = 1;
          if(amountedit){
            amount = args[1];
          }
          if(args[1] == "all"){
            amount = profileData.Items.CommonFish;
          }
          const FishCost = 200 * amount
          if(isNaN(amount)){
              return message.channel.send('please provide valid amount')
          }
          await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc:{
                coins: FishCost,
                "Items.CommonFish": -amount,
              },
            }
          );
          return message.channel.send(`You just sold \`${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\` Common Fish for **₪ ${FishCost} **`)
        }
        if(args[0]== "rarefish"){
          if(profileData.Items.RareFish == 0 || profileData.Items.RareFish < 0){
            return message.channel.send('you dont own that item!');
          }

          const amountedit = args[1]
          let amount = 1;
          if(amountedit){
            amount = args[1];
          }
          if(args[1] == "all"){
            amount = profileData.Items.RareFish;
          }
          const FishCost = 650 * amount
          if(isNaN(amount)){
              return message.channel.send('please provide valid amount')
          }
          await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc:{
                coins: FishCost,
                "Items.RareFish": -amount,
              },
            }
          );
          return message.channel.send(`You just sold \`${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\` Rare Fish for **₪ ${FishCost} **`)
        }
        if(args[0]== "mythicfish"){
          if(profileData.Items.MythicFish == 0 || profileData.Items.MythicFish < 0){
            return message.channel.send('you dont own that item!');
          }

          const amountedit = args[1]
          let amount = 1;
          if(amountedit){
            amount = args[1];
          }
          if(args[1] == "all"){
            amount = profileData.Items.MythicFish;
          }
          const FishCost = 1500 * amount
          if(isNaN(amount)){
              return message.channel.send('please provide valid amount')
          }
          await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc:{
                coins: FishCost,
                "Items.MythicFish": -amount,
              },
            }
          );
          return message.channel.send(`You just sold \`${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}\` Mythic Fish for **₪ ${FishCost} **`)
        }

      }catch (err) {
        return message.channel.send('you dont own that item!')
      }
        }
    }

