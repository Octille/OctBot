module.exports = {
    name: 'unban',
    description: '',
    aliases: [" "],
    async execute(message, args, cmd, client, Discord, profileData) {
        
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone`)
          }
          
          if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone`)
          }
          
          let userID = args[0]
          const nouserid = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`user not defiend`)
          .setDescription(`please provid the user id of the member you want to unban\ndont know how to get user id [click here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) for more info`)
          const unbanned = new Discord.MessageEmbed()
          .setColor("RED")
          .setTitle(`user unbanned`)
          .setDescription(`<@${args[0]}> has been unbanned`)
          if(!userID) return message.channel.send(nouserid)
            message.guild.fetchBans().then(bans=> {
            if(bans.size == 0) return message.channel.send(`that member has not banned or isnt in this server`)
            let bUser = bans.find(b => b.user.id == userID)
            if(!bUser) return message.channel.send(`that member connot be unbanned since they aren't banned from this server`)
            message.guild.members.unban(bUser.user)
            message.channel.send(unbanned)
            message.guild.channels.cache.get(message.channel.id).createInvite().then(invite =>{
                const unbannedmember = new Discord.MessageEmbed()
                .setTitle(`Unbanned`)
                .setDescription(`You have been unbanned from \`${message.guild.name}\`
                you can join back by clicking this link ` + invite.url)
                bUser.user.send(unbannedmember)
            }
            );
        
      })

    }

}