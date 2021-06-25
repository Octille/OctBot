const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'company',
    description: '',
    aliases: ["comp", "c"],
    async execute(message, args, cmd, client, Discord, profileData, settings) {
      
      const user = message.mentions.users.first() || message.author;
      let menstionedData;
      menstionedData = await profileModel.findOne({ userID: user.id });

            
      const totalminers = menstionedData.Company.miners
      const miners_owned = profileData.Company.miners;
      let minercost;
      if (miners_owned < 3) {
        minercost = 500000;
      } else if (miners_owned < 7){
        minercost = 1000000;
      } else if (miners_owned < 10){
        minercost = 1250000;
      } else if (miners_owned > 10){
        minercost = miners_owned * 75000 + 1000000
      }
      const totalworkers = menstionedData.Company.workers
      const workers_owned = profileData.Company.workers;
      let workerscost;
      if (workers_owned < 3) {
        workerscost = 150000;
      } else if (workers_owned < 7){
        workerscost = 250000;
      } else if (workers_owned < 10){
        workerscost = 500000;
      } else if (workers_owned > 10){
        workerscost = workers_owned * 65000 + 1000000
      }
      const workerhourly = totalworkers * 15000

      if(args[0] == "shop"){
        const shop1 = new Discord.MessageEmbed()
        .setColor("#6b32a8")
        .setTitle('Company Shop')
        .addField(`⛏️ Miners — ₪ ${minercost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, `With miners you can make money by doing ${settings.prefx}mine`)
        .addField(`👷 Workers — ₪ ${workerscost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, `Workings increase your hourly pay (${settings.prefx}hourly)`)
        .addField(`coming soon . . . `, `coming soon`)
        .addField(`coming soon . . . `, `coming soon`)
        .setFooter('Some prices might increase due to the amount of items you have\n!company buy (item)')
        return message.channel.send(shop1)

      }
      if (args[0] == "hourly"){
        
      }


      if(args[0] == "buy"){
        if(!args[1]){
          return message.channel.send("please provide something to buy")
        }
        
        if(args[1] == "miner"){
          
    
          
          const amountedit = args[2]
          let amount = 1;
          if(amountedit > 1){
            return message.channel.send(`You can only buy one miner at a time!`)
          }
          if(minercost > profileData.coins){
              return message.channel.send('You dont have enough to buy that');
          }
          mineramount = minercost
          

          await profileModel.findOneAndUpdate(
              {
                userID: message.author.id,
              },
              {
                $inc:{
                  coins: -minercost,
                  "Company.miners": amount,
                },
              }
            );
          return message.channel.send(`successfully bought **${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** miner(s) for **₪ ${mineramount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`)

      }
      if(args[1] == "worker"){
          
    
          
        const amountedit = args[2]
        let amount = 1;
        if(amountedit > 1){
          return message.channel.send(`You can only buy one worker at a time!`)
        }
        const workerscosts = workerscost * amount
        if(isNaN(amount)){
            return message.channel.send('please provide valid amount')
        }
        if(workerscosts  > profileData.coins){
            return message.channel.send('You dont have enough to buy that');
        }
        const mineramount = workerscost * amount
        

        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc:{
                coins: -workerscosts,
                "Company.workers": amount,
              },
            }
          );
        return message.channel.send(`successfully bought **${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** worker(s) for **₪ ${workerscosts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`)

    }

      }
      if (args[0]) {
          const company = new Discord.MessageEmbed()
          
      .setAuthor(`${user.username}'s Company`, user.displayAvatarURL({ dynamic: true }))
      .addField(`⛏️ Miners:`, `${totalminers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, true)
      .addField(`💵 Hourly avg`, `₪ ${workerhourly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, true)
      .addField(`👷 Workers`, `${totalworkers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, true)
      .addField(`🚀 Boosters`, `%0`, true)
      .setFooter('You can buy something from the shop by doing !company shop');

      return message.channel.send(company)

      }
      if (!args[0]) {
        const company = new Discord.MessageEmbed()
        
    .setAuthor(`${user.username}'s Company`, user.displayAvatarURL({ dynamic: true }))
    .addField(`⛏️ Miners:`, `${totalminers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, true)
    .addField(`💵 Hourly avg`, `₪ ${workerhourly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, true)
    .addField(`👷 Workers`, `${totalworkers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`, true)
    .addField(`🚀 Boosters`, `%0`, true)
    .setFooter('You can buy something from the shop by doing !company shop');

    return message.channel.send(company)

    }


    }

}