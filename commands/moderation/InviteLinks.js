const Guild = require('../../models/guild');
module.exports = {
    name: 'invitelinks',
    description: '',
    aliases: ["il"],
    async execute(message, args, cmd, client, Discord, profileData) {
        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You do not have permission to use this command!').then(m => m.delete({timeout: 10000}));
        };
        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX,
                    InviteLinks: False,
        
                })
        
                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));
        
                return message.channel.send('This server was not in our database! We have now added and you should be able to use bot commands.').then(m => m.delete({timeout: 10000}));
            }
        });
        if(!args[0]){
            const noonoff = new Discord.MessageEmbed()
            .setTitle('please provide if you want invite links')
            .addField(`invies On: `, `${settings.prefix}InviteLinks On`)
            .addField(`invies Off: `, `${settings.prefix}InviteLinks Off`)
            return message.channel.send(noonoff)
        }
        if(args[0] == "on"){
            await Guild.findOneAndUpdate(
                {
                  guildID: message.guild.id
                },
                {
                  $set: {
                    InviteLinks: 1,
                  },
                }
              );
              const invitelinkson = new Discord.MessageEmbed()
              .setTitle('Invite links')
              .setDescription('Invite links are now turned on!')
              .setFooter('Members on your server are now allowed to send invite links.')
              .setColor("2F3136")
              return message.channel.send(invitelinkson)
        }
        if(args[0] == "off"){
            await Guild.findOneAndUpdate(
                {
                  guildID: message.guild.id
                },
                {
                  $set: {
                    InviteLinks: 0,
                  },
                }
              );
              const invitelinksoff = new Discord.MessageEmbed()
              .setTitle('Invite links')
              .setDescription('Invite links are now turned off!')
              .setFooter('Make sure the users dont have the "manage messages" permission!')
              .setColor("2F3136")

              return message.channel.send(invitelinksoff)
        }

    }

}