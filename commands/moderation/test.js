const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'test',
    description: '',
    aliases: ["T"],
    async execute(message, args, cmd, client, Discord, profileData) {
      message.guild.channels.cache.get(message.channel.id).createInvite().then(invite =>
        message.channel.send(invite.url)
    );
    }
}