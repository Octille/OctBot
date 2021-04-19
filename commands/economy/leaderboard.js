const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'leaderboard',
    description: '',
    aliases: ["lb"],
    async execute(message, args, cmd, client, Discord) {
        let replyText = ``;
        const guild = message.guild
        

        var bar = guild.members.fetch().then(async(members) => {
            const memberid = {}
             
            let sortedusers
             await members.forEach(member => {
                var { id, user } = member
                var { username } = user
                  profileModel.findOne({ userID: id }).then(data => {
                      let Data = data;
                         
             try{
                memberid[Data.userID] = (memberid[Data.userID] || 0) + Data.coins
             }catch{

             }
                
            }) 
                
            })
            bar.then(err =>  {
                setTimeout(() => {;
                  
            
            
            sortedusers = Object.keys(memberid).sort(
                (a, b) => memberid[b] - memberid[a]
              )
              sortedusers.length = 5
            

              
              
                try{
                    for (const members of sortedusers) {
                        
                        const topusers = client.users.cache.find(user => user.id === members)               
                        const count = memberid[members]
                        replyText += `\n${topusers.username}: **₪ ${count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`     
                    }
                }catch(err){
                    console.log(err)
                }
                const topusersembed = new Discord.MessageEmbed()
                .setTitle('Top Users:')
                .setDescription(replyText)
                .setColor("RANDOM")
                .setFooter('note that this is the users balance and not networth')
                message.channel.send(topusersembed)
            
        }, 1000)
    });
    })
        
        

    }

}