module.exports = {
    name: 'earrape',
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        const channel = message.channel.id;
        message.channel.send('Are you sure you want to be eareraped?').then(async msg => {
            try {
                await msg.react('✔️');
                await msg.react('❌');
            } catch (error) {
                console.error('One of the emojis failed to react.');
            }
            const yes = '✔️'
            const no = '❌'

            client.on('messageReactionAdd', async (reaction, user) => {
                if (reaction.message.partial) await reaction.message.fetch();
                if (reaction.partial) await reaction.fetch();
                if (user.bot) return;
                if (!reaction.message.guild) return;
     
                if (reaction.message.channel.id == channel) {
                    if (reaction.emoji.name === yes) {
                        msg.delete()
                        reaction.users.remove(user.id);
                        client.distube.setVolume(message, 99999999999999999999999999);
                    }
                    if (reaction.emoji.name === no) {
                        msg.delete()
                        reaction.users.remove(user.id);
                        return message.channel.send('earrape operation was cancled')
                    } else {
                    return;
                    }
                }
            });
        });
    }
}