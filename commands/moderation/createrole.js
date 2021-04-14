
  module.exports = {
    name: 'createrole',
    description: '',
    aliases: ["cr"],
    async execute(message, args, cmd, client, Discord, profileData) {
      const channel = message.channel.id
      let rolename = 0
      let rolecolour = `0`
      
      const filter = (m) => m.author.id === message.author.id
      const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000 });
      message.channel.send('please provid a role name').then(() =>{})
      let deleted = 0;
      collector.on('collect', m => {
          
          if(rolename == '0'){
            rolename = m.content
              return message.channel.send(`Your role name has been set to \`${m.content}\`, now react with the colour you want the role to be.`).then( msg =>{
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
                  rolecolour = `BLACK`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === red) {
                  rolecolour = `RED`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === orange) {
                  rolecolour = `ORANGE`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === yellow) {
                  rolecolour = `YELLOW`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === green) {
                  rolecolour = `GREEN`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === blue) {
                  rolecolour = `BLUE`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === purple) {
                  rolecolour = `PURPLE`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === brown) {
                  rolecolour = `BROWN`
                  reaction.users.remove(user.id);
                }
                if (reaction.emoji.name === white) {
                  rolecolour = `WHITE`
                  reaction.users.remove(user.id);
                }
                message.guild.roles.create({
                  data: {
                    name: rolename,
                    color: rolecolour,
                  },
                })
                if(rolecolour !== `0`){
                  const rolecreated = new Discord.MessageEmbed()
                  .setTitle(`Role created 👍`)
                  .setDescription(`role name: ${rolename}\nrole colour: ${rolecolour}`)
                  .setColor(rolecolour)
                  message.channel.send(rolecreated)
                }
                return msg.delete()

            }
            
 
        });
      })    
      })
    }

        
      });

      collector.on('end', collected => {       
      });
    }

}