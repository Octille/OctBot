const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'buy',
    description: '',
    aliases: [" "],
    async execute(message, args, cmd, client, Discord, profileData, settings) {
      
        if(!args[0]){
            return message.channel.send(`please provide something to buy`)
        }
try{
        if(args[0] == "cookie"){
          const amountedit = args[1]
                let amount = 1;
                if(amountedit){
                  amount = args[1];
                }
                const cookiesscosts = 25 * amount
                if(isNaN(amount)){
                    return message.channel.send('please provide valid amount')
                }
                if(cookiesscosts > profileData.coins){
                    return message.channel.send('You dont have enough to buy that');
                }
                
      
                await profileModel.findOneAndUpdate(
                    {
                      userID: message.author.id,
                    },
                    {
                      $inc:{
                        coins: -cookiesscosts,
                        "Items.Cookies": amount,
                      },
                    }
                  );
                return message.channel.send(`successfully bought **${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** cookie for **₪ ${cookiesscosts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`)
      
            }
            if(args.join(' ')== "fishing rod"){
              return message.channel.send(`to buy a fishing rod the correct way is by doing \`${settings.prefix}buy fishingrod\``)
            }
            if(args[0] == "fishingrod"){
              const amountedit = args[1]
                    let amount = 1;
                    if(amountedit){
                      amount = args[1];
                    }
                    const FishingRodCost = 10000 * amount
                    if(isNaN(amount)){
                        return message.channel.send('please provide valid amount')
                    }
                    if(FishingRodCost > profileData.coins){
                        return message.channel.send('You dont have enough to buy that');
                    }
                    
          
                    await profileModel.findOneAndUpdate(
                        {
                          userID: message.author.id,
                        },
                        {
                          $inc:{
                            coins: -FishingRodCost,
                            "Items.FishingRod": amount,
                          },
                        }
                      );
                    return message.channel.send(`successfully bought **${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** Fishing Rod for **₪ ${FishingRodCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`)
                      }    
                      if(args[0]){
                        message.channel.send(`that item does not exist`)
                      }
          } catch (err) {
            message.channel.send(`that item does not exist`)
          }

        }
    }

