const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'transfer',
    description: '',
    aliases: ["share", "give"],
    async execute(message, args, cmd, client, Discord, profileData) {
      
        const user = message.author;
        const mentioned = message.mentions.users.first();
        const coins = profileData.coins
        if(!mentioned){
            return message.lineReply('please provide a person you want to transfer money to, do remember decimals numbers will be rounded')
        }
        let amount = args[1]
        amount = (amount*1).toFixed();
        if(!args[1]) {
            return message.lineReply('please provide a amount to transfer')
        }
        if(isNaN(amount)){
            return message.lineReply('please provide valid amount')
        }
        if(!args[1] < 0) {
          return message.lineReply('You canot send a negative amount')
      }
        if(amount > profileData.coins){
            return message.lineReply(`You can\'t share to ${mentioned} you only have **₪ ${coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** in your wallet`);
        }
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc : {
                coins: -amount,
              },
            }
          );
          await profileModel.findOneAndUpdate(
            {
              userID: message.mentions.users.first().id,
            },
            {
              $inc : {
                coins: amount,
              },
            }
          );
          return message.channel.send(`${user} You have successfully shared **₪ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** to ${mentioned}`)

        


    }

}