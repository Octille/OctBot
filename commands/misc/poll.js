const discord = require('discord.js');
 
 module.exports = {
    name: 'poll',
    description: "Sets up a poll!",
    async execute(message,args, cmd, client, Discord){
        let pollChannel = message.channel
        let pollDescription = args.join(' ');

        let embedPoll = new discord.MessageEmbed()
        .setTitle('New Poll!')
        .setDescription(pollDescription)
        .addField('Author:', message.author)
        .setColor('YELLOW')
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }

}


