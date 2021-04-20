const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'test',
    async execute(message,args, cmd, client, Discord) {
        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $set : {
                topggrewards: "NotClaimed",
              },
            }
          );
          message.channel.send(`dk`)
    }
}