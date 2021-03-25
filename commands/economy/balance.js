const profileModel = require("../../models/profileSchema");
module.exports = {
    name: "balance",
    aliases: ["bal", "bl"],
    description: "Check the user balance",
    async execute(message, args, cmd, client, Discord,) {
      
      try {
      const user = message.mentions.users.first() || message.author;

      let profileData;
      try {
        profileData = await profileModel.findOne({ userID: message.mentions.users.first().id })
      } catch (err) {
        profileData = await profileModel.findOne({ userID: message.author.id })
      }
      const coins = profileData.coins;
      const bank = profileData.bank;
      const total = coins+bank;
      
        const Balance = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${user.username}'s balance`, user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Wallet: **₪ ${profileData.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**\n Bank: **₪ ${profileData.bank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** \nTotal net worth: **₪ ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`)
        
          message.channel.send(Balance);
        } catch (err){
          message.channel.send('you or the person you mentioned doesnt have a bank')
        }
      
    },
  };