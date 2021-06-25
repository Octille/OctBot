const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'mine',
    description: 'mines some coins',
    cooldown: 60 * 30,
    async execute(message, args, cmd, client, Discord, profileData) {
      
        if(!profileData.Company.miners) return message.channel.send('looks like you dont have a miner go to the shop and buy one!')
      const k = Math.floor(Math.random() * 5000) + 25000   
        const recieved = profileData.Company.miners * k
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
          return message.channel.send(`**${message.author.username}** has ran their miners and got** ₪ ${recieved.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`)

}
}