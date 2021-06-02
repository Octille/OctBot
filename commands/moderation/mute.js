const ms = require('ms');
module.exports = {
    name: 'mute',
    description: 'mutes a member',
    async execute(message,args, cmd, client, Discord){
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!member) return message.reply('Please Provide A Member To Mute.')
            let role = message.guild.roles.cache.find(role => role.name === "muted");
            
            if(!role) {
                try {
                    message.channel.send('Muted role is not found, attempting to create muted role.')
    
                    let muterole = await message.guild.roles.create({
                        data : {
                            name : 'muted',
                            permissions: []
                        }
                    });
                    message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false
                        })
                    });
                    message.channel.send('Muted role has sucessfully been created.')
                    role = muterole
                } catch (error) {
                    console.log(error)
                }
            };


            member.roles.add(role.id);
            const muted = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Muted`)
            .setDescription(`**Member muted: **${member.user}
            **Time: ** Perm
            **By: **${message.author}`)


            const mutedmember = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle(`Muted`)
            .setDescription(`**Time: ** Perm
            **By: **${message.author}
            **Server: **${message.guild.name}`)

            message.channel.send(muted)
            try{
                member.send(mutedmember)
            }catch (error){

            }




        } else {
            return message.channel.send('I do not have permissions to give/remove members role!')
        }
    }
}
