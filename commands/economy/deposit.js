const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'deposit',
    description: 'deposts all your money',
    aliases: ["dep"],
    async execute(message, args, cmd, client, Discord, profileData) {
      
      
      const bank = profileData.bank
      const coins = profileData.coins
      const alltotal = bank+coins
        const amount = args[0]
        const banktotal = bank+amount
        
        if(args[0] == "all"){
            const all = profileData.coins
            if(all < 1){
                return message.channel.send('you cant deposit any coins your wallet is 0 ')
            }
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                    $inc: {
                      coins: -all,
                      bank: all,
                    },
                  }
                );
                return message.channel.send(`Succesfully deposit **₪ ${all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** to your bank, you now have **₪ ${alltotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** in your bank`)
        }
        if (isNaN(amount)) {
            return message.channel.send('please provide a valid amount')
             }
             if (amount % 1 != 0 || amount <= 0) return message.channel.send("deposit amount must be a whole number");
             if(amount> profileData.coins){
                return message.channel.send('You dont have that many coins in your wallet!');
            }
             await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                    $inc: {
                      coins: -amount,
                      bank: amount,
                    },
                  }
                );
                return message.channel.send(`Succesfully deposit **₪ ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** to your bank`)


    }

}