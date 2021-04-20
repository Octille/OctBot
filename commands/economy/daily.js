const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'daily',
    cooldown: 60 * 60 * 24,
    async execute(message, args, cmd, client, discord, profileData) {
      
        const daily = 7500
        const response = await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
                $inc: {
                  coins: daily,
                },
              }
            );
            return message.lineReply(`**₪ ${daily.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** were placed in your wallet`)

    }
}