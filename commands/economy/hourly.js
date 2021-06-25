const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'hourly',
    cooldown: 60 * 60,
    async execute(message, args, cmd, client, discord, profileData){
        if(!profileData.Company.miners) return message.channel.send('Looks like you dont have a worker, buy one from your company shop.')
        const k = Math.floor(Math.random() * 5000) + 5000   
        const recieved = profileData.Company.workers * k
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc : {
                coins: recieved,
              },
            }
          );
          return message.channel.send(`**${message.author.username}** has claimed ** ₪ ${recieved.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** from hourly`)
        
    }
}