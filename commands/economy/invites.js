module.exports = {
    name: 'invites',
    description: '',
    aliases: [" "],
    async execute(message, args, cmd, client, Discord, profileData) {
        const guild = client.guilds.cache.get("460513289558949895");
        

        guild.fetchInvites().then((invites) => {
            const inviteCounter = {}

            invites.forEach((invite) => {
                const { uses, inviter } = invite
                const { username, discriminator } = inviter

                const name = `${username}#${discriminator}`

                inviteCounter[name] = (inviteCounter[name] || 0) + uses
    
            })
            let replyText = `invites:`

            const sortedInvites = Object.keys(inviteCounter).sort(
                (a, b) => inviteCounter[b] - inviteCounter[a]
              )
                sortedInvites.length = 3
            
            for (const invite of sortedInvites) {
                const count = inviteCounter[invite]
                replyText += `\n${invite} has invited ${count} member(s)!`     
            }
            message.channel.send(replyText)

        })


    }

}