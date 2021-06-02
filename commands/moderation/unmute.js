const ms = require('ms');
module.exports = {
    name: 'unmute',
    description: 'mutes a member',
    async execute(message,args, cmd, client, Discord){
        if(message.member.hasPermission('MANAGE_MESSAGES')) {
            var member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
            if(!member) return message.reply('Please Provide A Member To Unmute.')
            let role = message.guild.roles.cache.find(role => role.name === "muted");
            
            if(!role) {
                return message.channel.send('The member you provided are not muted!')
            };


            member.roles.remove(role.id);
            const unmuted = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Unmuted`)
            .setDescription(`${member.user} has now been unmuted.`)

            const unmutedmember = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Unmuted`)
            .setDescription(`You have been unmuted on ${message.guild.name}.`)

            message.channel.send(unmuted)
            try{
                member.send(unmutedmember)
            }catch(err){

            }




        } else {
            return message.channel.send('I do not have permissions to give/remove members role!')
        }
    }
}
