const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    async execute(message,args, cmd, client, Discord, profileData){
      
        if(isNaN(args[0])){
            return message.channel.send('Please provid a number you want to double')
        }
        if(profileData.coins < args[0]){
            return message.channel.send('lol your not that rich, please provid a number in your wallet')
        }
        const double = args[0] * 2
        let outcomes = ["Heads", "Tails"];
      
        let outcomesIndex = Math.round(Math.random() * outcomes.length);
  
        if(outcomesIndex < 1){
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc:{
                    coins: double,
                  },
                }
              );
              const embed = new Discord.MessageEmbed()
              .setTitle('CoinFlip')
              .setDescription(`You fliped a coin and got tails, you got **₪ ${double}**`)
              return message.channel.send(embed)
        }
        if(outcomesIndex < 2){
            await profileModel.findOneAndUpdate(
                {
                  userID: message.author.id,
                },
                {
                  $inc:{
                    coins: -args[0],
                  },
                }
              );
              const embed = new Discord.MessageEmbed()
              .setTitle('CoinFlip')
              .setDescription(`You fliped a coin and got heads, you lost **₪ ${args[0]}**`)
              return message.channel.send(embed)
        }
        

    }
}