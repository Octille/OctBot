  
const Guild = require('../../models/guild')
module.exports = {
    name: 'welcome',
    description: '',
    aliases: ["wc"],
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
                    welcomeID: 0
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
            }
        });
        if(!args[0]){
            const welcomeembed = new Discord.MessageEmbed()
            .setTitle("Welcome message")
            .addField(`setup:`, `${settings.prefix}welcome setup`)
            .addField(`disable:`, `${settings.prefix}welcome disable`)
            return message.channel.send(welcomeembed)
        }
        if(args[0] == 'disable'){
            if(!settings.welcomeID){
                return message.channel.send('welcome messages are already disabled')
            }
            if(!settings.welcomeID == `0`){
                return message.channel.send('welcome messages are already disabled')
            }
            await Guild.findOneAndUpdate(
                {
                  guildID: message.guild.id
                },
                {
                  $set: {
                    welcomeID: 0,
                  },
                }
              );
              return message.channel.send('welcome messages are now disabled')

        }
        if(args[0] == 'setup'){
        const idchannel = message.channel.id
        const welcomeCID = settings.welcomeID
        if(welcomeCID == `${idchannel}`){
            return message.channel.send('You already set up a welcome message on this channel')
        }
        await Guild.findOneAndUpdate(
            {
              guildID: message.guild.id
            },
            {
              $set: {
                welcomeID: idchannel,
              },
            }
          );
         
        const embed = new Discord.MessageEmbed()
        .setTitle("Welcome channel setup")
        .setDescription(`Channel Id:\`#${idchannel}\``)
        .setFooter(`to disable welcome messages on your server do ${settings.prefix}welcome disable`)
        return message.channel.send(embed);
    }
       

    }

}