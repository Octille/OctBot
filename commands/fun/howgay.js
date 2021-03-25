module.exports = {
    name: 'howgay',
    description: 'see how gay someone is',
    async execute(message, args, cmd, client, Discord, profileData) {
        const user = message.mentions.users.first() || message.author;
        if (user.id == "515341060818337792"){
            const aviator = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("gay o meter")
            .setDescription(`${user} is 100% gay:rainbow_flag:`) 
            return message.channel.send(aviator)
        }
        if (user.id == "431562938692927488"){
            const aviator = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("gay o meter")
            .setDescription(`${user} is 100% gay:rainbow_flag:`) 
            return message.channel.send(aviator)
        }
        if (user.id == "554399813655986215"){
            const aviator = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("gay o meter")
            .setDescription(`${user} is 100% gay:rainbow_flag:`) 
            return message.channel.send(aviator)
        }
        if (user.id == "719249068563628102"){
            const aviator = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("gay o meter")
            .setDescription(`${user} is 100% gay:rainbow_flag:`) 
            return message.channel.send(aviator)
        }
        if (user.id == "460509056487129090"){
            const aviator = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("gay o meter")
            .setDescription(`${user} is 0% gay:rainbow_flag:`) 
            return message.channel.send(aviator)
        }
        const loss = Math.floor(Math.random() * 99) + 1;
        const gay = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("gay o meter")
        .setDescription(`${user} is %${loss} gay:rainbow_flag:`) 
        return message.channel.send(gay)

    }

}