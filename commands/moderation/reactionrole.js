const { MessageEmbed, MessageCollector } = require('discord.js');
const ReactionRoleSchema = require('../../models/ReactionRole');

module.exports = {
    name: 'reactionroles',
    aliases: ['rr'],
    async execute(message, args, cmd, client, Discord){
        if(!message.member.hasPermission("MANAGE_ROLES")){
            return message.channel.send('You Need permissions To Run This Command!')
        }
        if(!message.guild.me.hasPermission("ADMINISTRATOR")){
        return message.channel.send('I need Admin permissions to give roles')
        }
        //Please provid the message id of the message you want to reaction role.
        const secondEmbed = new MessageEmbed()
        .setTitle('Reaction Role Setup')
        .setDescription('Where do you want the reaction role? Please mention a channel')
        .setFooter('TIP: use the embed command to make the message.')
        .setColor('BLUE');
        message.channel.send(secondEmbed);

        const zeroFilter = m => m.author.id === message.author.id;
        const zeroCollector = new MessageCollector(message.channel, zeroFilter, { max: 2 });
        zeroCollector.on('collect', async msg => {
            let reactionChannel = msg.mentions.channels.first();
            if (!reactionChannel) {
                msg.channel.send('That is not a valid channel! Please try again.');
                zeroCollector.stop();
                return;
            }
            const zeroEmbed = new MessageEmbed()
            .setTitle('Reaction Role Setup')
            .setDescription('Please provid the message id of the message you want to reaction role.')
            .setColor('BLUE');
            msg.channel.send(zeroEmbed);
            zeroCollector.stop();

        const firstFilter = m => m.author.id === message.author.id;
        const firstCollector = new MessageCollector(message.channel, firstFilter, { max: 2 });



        firstCollector.on('collect', async msg => {
            let messageid = msg.content
            embedDescription = msg.content;
            const thirdEmbed = new MessageEmbed()
            .setTitle('Reaction Role Setup')
            .setDescription('What roles do you want to reaction role? Please provide a role name, mention, or ID.')
            .setColor('BLUE');
            msg.channel.send(thirdEmbed);
            firstCollector.stop();

            const secondFilter = m => m.author.id === message.author.id;
            const secondCollector = new MessageCollector(message.channel, secondFilter, { max: 2 });

            secondCollector.on('collect', async msg => {
                let savedRole = msg.mentions.roles.first() || msg.guild.roles.cache.get(message.content) || msg.guild.roles.cache.find(role => role.name.toLowerCase() === message.content.toLowerCase());

                if (!savedRole) {
                    msg.channel.send('That is not a valid role! Please try again.');
                    secondCollector.stop();
                    return;
                }

                const fourthEmbed = new MessageEmbed()
                .setTitle('Reaction Role Setup')
                .setDescription('Please provide the emoji you like me to react with.')
                .setColor('BLUE');
                msg.channel.send(fourthEmbed)
                secondCollector.stop();

                const thirdFilter = m => m.author.id === message.author.id;
                const thirdCollector = new MessageCollector(message.channel, thirdFilter, { max: 2 });

                thirdCollector.on('collect', async message => {

                            let reactionEmoji = message.content
                            const fifthEmbed = new MessageEmbed()
                            .setTitle('Reaction Role Setup')
                            .setDescription('The setup has been complete')
                            .setColor('BLUE');
                            message.channel.send(fifthEmbed)
                            await reactionRoleData(messageid, message, savedRole, reactionEmoji, reactionChannel)
                            return thirdCollector.stop()

                   
                });
            });
        });
    })
    }
}

async function reactionRoleData(messageid, message, savedRole, reactionEmoji, reactionChannel) {

    message.client.channels.fetch(reactionChannel.id).then(channel => {
        channel.messages.fetch(messageid).then(message => {
            message.react(reactionEmoji);
        })
    })

    const newData = new ReactionRoleSchema({
        Emoji: reactionEmoji,
        MessageID: messageid,
        GuildID: message.guild.id,
        RoleID: savedRole.id,
    });
    newData.save();
}
