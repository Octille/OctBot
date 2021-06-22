const { MessageEmbed, MessageCollector } = require('discord.js');
const AutoRoleData = require('../../models/AutoRoles');

module.exports = {
    name: 'autorole',
    async execute(message, args, cmd, client, Discord){
        if(!message.member.hasPermission("MANAGE_ROLES")){
            return message.channel.send('You Need permissions To Run This Command!')
        }
        if(!message.guild.me.hasPermission("ADMINISTRATOR")){
        return message.channel.send('I need Admin permissions to give roles')
        }
        const data = await AutoRoleData.findOne({ GuildID: message.guild.id });
        if(!data){
        const firstFilter = m => m.author.id === message.author.id;
        const firstCollector = new MessageCollector(message.channel, firstFilter, { max: 1 });

        const thirdEmbed = new MessageEmbed()
        .setTitle('Auto Role Setup')
        .setDescription('What role do you want give to new members? Please provide a role name, mention, or ID.')
        .setColor('BLUE');
        message.channel.send(thirdEmbed);

        firstCollector.on('collect', async msg => {
            let savedRole = msg.mentions.roles.first() || msg.guild.roles.cache.get(msg.content) || msg.guild.roles.cache.find(role => role.name.toLowerCase() === msg.content.toLowerCase());
    
            if (!savedRole) {
                msg.channel.send('That is not a valid role! Please try again.');
                firstCollector.stop()
                return;
            }
            const autoroleembed = new Discord.MessageEmbed()
            .setTitle("Auto Role Setup")
            .setDescription(`Your server auto role has been setup too\n${savedRole}`)
            .setFooter("You can disable auto role by doing this command again.")
            .setColor("BLUE")
            message.channel.send(autoroleembed)
            await createAutoRole(savedRole, message)
            
        })
    } else {
        await data.findOneAndDelete({
            GuildID: message.guild.id
        });
        message.channel.send(`**Successfuly Reset the auto role on your Server!**\nplease use this command again to re-setup!`);
    }

    }
}

async function createAutoRole(savedRole, message) {

    const newData = new AutoRoleData({
    AutoRoleID: savedRole.id,
    GuildID: message.guild.id,
    });
    newData.save();
}
