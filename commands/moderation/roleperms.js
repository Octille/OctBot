const Permissions = require('discord.js');
module.exports = {
    name: 'roleperms',
    description: '',
    aliases: ["rp"],
    async execute(message, args, cmd, client, Discord, profileData, settings) {
        const channel = message.channel.id
        if(!args[0]){
            const noargs = new Discord.MessageEmbed()
            .setTitle(`Role permissions`)
            .setDescription(`**how to use command**\n${settings.prefix}roleperms (role name) (permission)`)
            return message.channel.send(noargs)
        }
        if(!args[1]){
            const noperms = new Discord.MessageEmbed()
            .setTitle(`please prove a permission`)
            .setDescription(`**all valid discord permissions**
CREATE_INSTANT_INVITE
KICK_MEMBERS
BAN_MEMBERS
ADMINISTRATOR
MANAGE_CHANNELS 
MANAGE_GUILD 
ADD_REACTIONS	
VIEW_AUDIT_LOG		
PRIORITY_SPEAKER
STREAM	
VIEW_CHANNEL	
SEND_MESSAGES	
SEND_TTS_MESSAGES	
MANAGE_MESSAGES 
EMBED_LINKS	
ATTACH_FILES	
READ_MESSAGE_HISTORY	
MENTION_EVERYONE	
USE_EXTERNAL_EMOJIS	
VIEW_GUILD_INSIGHTS	
CONNECT	
SPEAK	
MUTE_MEMBERS	
DEAFEN_MEMBERS
MOVE_MEMBERS
USE_VAD
CHANGE_NICKNAME
MANAGE_NICKNAMES
MANAGE_ROLES
MANAGE_WEBHOOKS
MANAGE_EMOJIS
USE_SLASH_COMMANDS	
REQUEST_TO_SPEAK`)
return message.channel.send(noperms)
        }
let role = await message.guild.roles.create({
    data : {
        name : args[0],
        permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS']
    }
});

const everyonePerms = new Permissions(message.guild.defaultRole.permissions);
const newPerms = everyonePerms.add(['MANAGE_MESSAGES', 'KICK_MEMBERS']);

message.guild.defaultRole.setPermissions(newPerms.bitfield)
    .then(() => message.channel.send('Added mod permissions to `@everyone`.'))
    .catch(console.error);
message.channel.send('role created')
    }

}