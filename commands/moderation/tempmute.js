const ms = require('ms');
module.exports = {
    name: 'tempmute',
    description: 'tempmutes a member',
    async execute(message,args, cmd, client, Discord){
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!member) return message.reply('Please Provide a Member to TempMute.')
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

            let time = args[1];
            if (!time) {
                return message.reply("You didnt specify a time!");
            }
            member.roles.add(role.id);

            message.channel.send(`@${member.user.tag} has now been muted for ${ms(ms(time))}`)

            setTimeout( function () {
                member.roles.remove(role.id);
                message.channel.send(`@${member.user.tag} has been unmuted.`)
            }, ms(time));

        } else {
            return message.channel.send('You dont have perms.')
        }
    }
}
