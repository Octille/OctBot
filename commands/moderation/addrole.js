module.exports = {
    name: 'addrole',
    description: '',
    aliases: ["ar"],
    async execute(message, args, cmd, client, Discord, profileData, settings) {
if(!message.member.hasPermission("MANAGE_ROLES")){
    return message.channel.send('You Need permissions To Run This Command!')
}
if(!message.guild.me.hasPermission("ADMINISTRATOR")){
return message.channel.send('I need Admin permissions to give roles')
}
if(!args[0]){
    const howto = new Discord.MessageEmbed()
    .setTitle(`Add roles to user`)
    .setDescription(`**how to**\n${settings.prefix}addrole (member) (rolename)\n**example**\n${settings.prefix}addrole <@460509056487129090> Admin`)
    .setColor("RANDOM")
    return message.channel.send(howto)

}
if(!args[1]){
    const howto = new Discord.MessageEmbed()
    .setTitle(`Add roles to user`)
    .setDescription(`**how to**\n${settings.prefix}addrole (member) (rolename)\n**example**\n${settings.prefix}addrole <@460509056487129090> Admin`)
    .setColor("RANDOM")
    return message.channel.send(howto)
}
try{
let role = message.guild.roles.cache.find(r => r.name === args[1]);

let member = message.mentions.members.first() || message.mentions.author.first();


const rolegiven = new Discord.MessageEmbed()
.setTitle(`role given`)
.setDescription(`${member} has been given the role ${role}`)
.setColor("GREEN")
member.roles.add(role);
message.channel.send(rolegiven)

}catch(err){
    const error = new Discord.MessageEmbed()
    .setTitle(`Error`)
    .setDescription(err)
    .setColor("RED")
    return message.channel.send(error)
}

}
}