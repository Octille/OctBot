
  module.exports = {
    name: 'createrole',
    description: '',
    aliases: ["cr"],
    async execute(message, args, cmd, client, Discord, profileData) {
      if(!message.member.hasPermission("MANAGE_ROLES")){
        return message.channel.send('You Need permissions To Run This Command!')
   }
   if(!message.guild.me.hasPermission("ADMINISTRATOR")){
    return message.channel.send('I need Admin permissions to create roles')
}
      const channel = message.channel.id
      let roletype = `0`
      let rolename = `0`
      let rolecolour = `0`
      
      const filter = (m) => m.author.id === message.author.id
      const collector = message.channel.createMessageCollector(filter, { max: 1, time: 30000 });
      message.channel.send('please provid a role name').then(() =>{})

      collector.on('collect', m => {
          
          if(rolename == '0'){
            rolename = m.content
              return message.channel.send(`Your role name has been set to \`${m.content}\`, now react with the colour you want the role to be.`).then(async (msg)=> {
                msg.react(`⚫`)
                msg.react(`🔴`)
                msg.react(`🟠`)
                msg.react(`🟡`)
                msg.react(`🟢`)
                msg.react(`🔵`)
                msg.react(`🟣`)
                msg.react(`🟤`)
                msg.react(`⚪`).then(() =>{

                   

          const black = `⚫`
          const red = `🔴`
          const orange = `🟠`
          const yellow = `🟡`
          const green = `🟢`
          const blue = `🔵`
          const purple = `🟣`
          const brown = `🟤`
          const white = `⚪`

          client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === black) {
                  rolecolour = `#000000`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === red) {
                  rolecolour = `#FF0000`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === orange) {
                  rolecolour = `#FFA500`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === yellow) {
                  rolecolour = `#FFFF00`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === green) {
                  rolecolour = `#00FF00`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === blue) {
                  rolecolour = `#0000FF`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === purple) {
                  rolecolour = `#800080`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === brown) {
                  rolecolour = `#964B00`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === white) {
                  rolecolour = `#FFFFFF`
                  reaction.users.remove(user.id);
                }
                
                
                if(rolecolour !== '0'){
                  
                  
                  if(roletype == '0'){
                    try{
                      msg.delete()
                      }catch(err){
                        return
                      }
                const choosetype = new Discord.MessageEmbed()
                .setTitle(`Role type`)
                .setDescription(`
                🛡️-Admin
                ⬜-Default
                `)
                .setFooter(`react with one of the emojis below`)
                .setColor(rolecolour)

                message.channel.send(choosetype).then( m1 =>{
                  if(roletype !== '0'){
                    try{
                    return m1.delete()
                    }catch(err){
                      return;
                    }
                  }

                  m1.react('🛡️')
                  m1.react('⬜').then(async() =>{
                    client.on('messageReactionAdd', async (reaction, user) => {

                      const normalrole = '⬜'
                      const adminrole = '🛡️'

                      

                  
                      if (reaction.message.partial) await reaction.message.fetch();
                      if (reaction.partial) await reaction.fetch();
                      if (user.bot) return;
                      if (!reaction.message.guild) return;

                      if (reaction.message.channel.id == channel) {
                        if (reaction.emoji.name === normalrole) {
                          try{
                            message.guild.roles.create({
                              data: {
                                name: rolename,
                                color: rolecolour,
                              },
                            })
                            roletype = `Default Role`
                            const rolecreated = new Discord.MessageEmbed()
                            .setTitle(`Role created 👍`)
                            .setDescription(`role name: \`${rolename}\`\nrole colour: \`${rolecolour}\`\nrole type: \`${roletype}\``)
                            .setColor(rolecolour)
                           message.channel.send(rolecreated)
                           try{
                            return m1.delete()
                            }catch(err){
                              return;
                            }
                           
                          }catch(err){
                            return
                          }                   
                        }
                          if (reaction.emoji.name === adminrole) {
                            try{
                              message.guild.roles.create({
                                data: {
                                  name: rolename,
                                  color: rolecolour,
                                  permissions: ['ADMINISTRATOR']
                                },
                              })
                              roletype = `Admin Role`
                              const rolecreated = new Discord.MessageEmbed()
                              .setTitle(`Role created 👍`)
                              .setDescription(`role name: \`${rolename}\`\nrole colour: \`${rolecolour}\`\nrole type: \`${roletype}\``)
                              .setColor(rolecolour)
                             message.channel.send(rolecreated)
                             try{
                              return m1.delete()
                              }catch(err){
                                return;
                              }
                            }catch(err){
                              return
                            }
                          
                          }
                          
                          
 
                        }


                         
                        
                        
                    })

                  })
                  

                })
              }
              }


            }

          }) 

        });   
        


          
        

  
      })
    }

        
      });
    }

}