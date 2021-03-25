const discord = require('discord.js');
 
 module.exports = {
    name: 'pole',
    description: "Sets up a pole!",
    async execute(message,args, cmd, client, Discord){
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(' ');

        let embedPoll = new discord.MessageEmbed()
        .setTitle('New Pole!')
        .setDescription(pollDescription)
        .addField('Author:', message.author)
        .setColor('YELLOW')
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    }

}


