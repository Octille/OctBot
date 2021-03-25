const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'test',
    description: '',
    aliases: ["T"],
    async execute(message, args, cmd, client, Discord, profileData) {

    
const begbeg = profileData.cooldowns.Beg + "0000-00-00T00:12:00.000Z"
await profileModel.findOneAndUpdate(
  {
    userID: message.author.id,
  },
  {
    $inc: {
      "cooldowns.Beg":  Timestamp(1579726934, 2),
    }
  }
)
    }
}