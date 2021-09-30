const profileModel = require("../../models/profileSchema");
module.exports = {
    name: "userban",
    async execute(message, args, cmd, client, Discord, profileData){
        if (message.member.id != "460509056487129090") return message.channel.send(`Sorry only **Oct** can run this command 😔`);
        if (!args.length) return message.channel.send("You need to mention a user to ban them!");
        const target = message.mentions.users.first() || message.author;
        if (!target) return message.channel.send("That user does not exist");
        await profileModel.findOneAndUpdate(
            {
                userID: target.id
            },
            {
              $set: {
                banned: 1,
              },
            }
          );
          message.channel.send(`${target} Has successfully been banned and can no longer use oct bot.`)

    }
}