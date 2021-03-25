const profileModel = require("../../models/profileSchema");
const fs = require("fs");
module.exports = {
    name: 'inventory',
    description: '',
    aliases: ["inv"],
    async execute(message, args, cmd, client, Discord,  settings) {
      
        try {
            const user = message.mentions.users.first() || message.author;
      
            let profileData;
            try {
              profileData = await profileModel.findOne({ userID: message.mentions.users.first().id })
            } catch (err) {
              profileData = await profileModel.findOne({ userID: message.author.id })
            }
        let items = profileData.Items
        if(profileData.Items == null) {
            items = `looks like you dont have any items you can but some from \`${settings.prefix}shop\``
        }
        items = items.toString()
        .replace(/,/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        .replace(/[{()}]/g, '')
        .replace(/Shirt/, '👕 Shirt')
        .replace(/Pants/, '👖 Pants')
        .replace(/Cookies/, '🍪 Cookies')
        .replace(/CommonFish/, '🐟 Common Fish')
        .replace(/RareFish/, '🐡 Rare Fish')
        .replace(/MythicFish/, '🐠 Mythic Fish')
        .replace(/FishingRod/, '<:FishingRod:816342491111882782> Fishing Rod')
        .replace(/placeholder: 0/, '')
        
        


        

        const FishingRod = profileData.Items.FishingRod
        const Cookies = profileData.Items.Cookies
        const inventory1 = new Discord.MessageEmbed()
        .setAuthor(`${user.username}'s Inventory`, user.displayAvatarURL({ dynamic: true }))
        .setColor("BLUE")
        .setDescription(`${items}`)
        
            return message.channel.send(inventory1)
            
        } catch (err){
            message.channel.send('that person does not exist in my database')
          }
  
        
    
        }
    
}