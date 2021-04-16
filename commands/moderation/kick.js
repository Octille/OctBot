const discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    async execute(message,args, cmd, client, Discord){
        if(!message.member.hasPermission("KICK_MEMBERS")){
             return message.channel.send('You Need Permistions To Run This Command!')
        }

        const user = message.mentions.users.first();
        if(!user) return message.channel.send('You need to mention a member!')
        if(user == message.author) return message.channel.send(`you cannot kick your self!!`)
        let description = args.slice(1).join(" ") 
        if(!description) return message.channel.send('please specify a reason')

        
        const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('Member Kicked')
        .setDescription(`successfully kicked ${user}`+ "\nReason:" + description)

        if(user){
          try{
            const memberTarget = message.guild.members.cache.get(user.id);
            memberTarget.kick();
            message.channel.send(embed);
            try{
              const kicked = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle(`Kicked`)
              .setDescription(`you have been kicked from \`${message.guild.name}\`
              **- By: **${message.author}
              **- reason: **${description}`)
              user.send(kicked)

            }catch(err){
              
            }
          }catch(err){
            return message.channel.send(`Sorry but i can kick someone with higher roles then me`)
          }

            }
          } 

        }
        
