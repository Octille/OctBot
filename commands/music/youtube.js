const { json } = require('mathjs');
const fetch = require('node-fetch');

module.exports = {
    name: 'youtube',
    aliases: ['yt'],
    async execute(message, args, cmd, client, Discord){

    const { channel } = message.member.voice
    if (!channel) return message.channel.send('**You must be in a voice channel to use this command!**');
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "880218394199220334",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${process.env.token}`,
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(invite =>{
        if(!invite.code) return message.channel.send('Could not create a youtube together link!')
        const ytembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle('Youtube Together')
        .setDescription(`[Click here](https://discord.com/invite/${invite.code}) to join a Youtube Together Activity`)
        message.channel.send(ytembed)
    })
    }
}


