const mongoose = require('mongoose')
const Guild = require('../../models/guild')
module.exports = {
    name: 'prefix',
    description: 'sets up a per server prefix',
    async execute(message, args, cmd, client, Discord, profileData) {

        if (!message.member.hasPermission('MANAGE_GUILD')) {
            return message.channel.send('You do not have permission to use this command!').then(m => m.delete({timeout: 10000}));
        };

        const settings = await Guild.findOne({
            guildID: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err)
            if (!guild) {
                const newGuild = new Guild({
                    _id: mongoose.Types.ObjectId(),
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    prefix: process.env.PREFIX
                })

                newGuild.save()
                .then(result => console.log(result))
                .catch(err => console.error(err));

                return message.channel.send('This server was not in our database! We have added it, please retype this command.').then(m => m.delete({timeout: 10000}));
            }
        });

        if (args.length < 1) {
            const noprefixembed = new Discord.MessageEmbed()
            .setTitle("Prefix")
            .setDescription(`You must specify a prefix to set for this server!\nYour current server prefix is \`${settings.prefix}\``)
            .setColor("BLUE")
            return message.channel.send(noprefixembed)
        };

        await settings.updateOne({
            prefix: args[0]
        });
        const newPrefix = new Discord.MessageEmbed()
        .setTitle('Prefix')
        .setDescription(`Your server prefix has been updated to \`${args[0]}\``)
        .setFooter('You can also mention me if you forgot your prefix.')
        .setColor("BLUE")

        return message.channel.send(newPrefix)
    }
}

