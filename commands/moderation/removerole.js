module.exports = {
    name: 'removerole',
    description: '',
    async execute(message, args, cmd, client, Discord, profileData, settings) {
if(!message.member.hasPermission("MANAGE_ROLES")){
    return message.channel.send('You Need permissions To Run This Command!')
}
if(!message.guild.me.hasPermission("ADMINISTRATOR")){
return message.channel.send('I need Admin permissions to give roles')
}
if(!args[0]){
    const howto = new Discord.MessageEmbed()
    .setTitle(`Remove roles from user`)
    .setDescription(`**how to**\n${settings.prefix}addrole (member) (rolename)\n**example**\n${settings.prefix}removerole <@460509056487129090> Admin`)
    .setColor("RANDOM")
    return message.channel.send(howto)

}
if(!args[1]){
    const howto = new Discord.MessageEmbed()
    .setTitle(`Remove roles from user`)
    .setDescription(`**how to**\n${settings.prefix}addrole (member) (rolename)\n**example**\n${settings.prefix}removerole <@460509056487129090> Admin`)
    .setColor("RANDOM")
    return message.channel.send(howto)
}
try{
let role = message.guild.roles.cache.find(r => r.name === args[1]);

let member = message.mentions.members.first() || message.mentions.author.first();


const rolegiven = new Discord.MessageEmbed()
.setTitle(`Role removed`)
.setColor("GREEN")


if(role === undefined || !role){
    const noroles = new Discord.MessageEmbed()
    .setTitle('Role not found!')
    .setDescription(`I could not find the role **${args[1]}**`)
    .setColor("RED")
    return message.channel.send(noroles)
}
if(role){
    member.roles.remove(role);
    rolegiven.setDescription(`${member} has been given the role ${role}`)
}else if(message.mentions.roles){
    member.roles.remove(message.mentions.roles);
    const roleNames = message.mentions.roles.map(r => r.name).toString()
    let roleMention = message.guild.roles.cache.find(r => r.name === roleNames);
    rolegiven.setDescription(`${member} has been given the role ${roleMention}`)
} 

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