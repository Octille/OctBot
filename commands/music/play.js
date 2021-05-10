module.exports = {
    name: "play",
    aliases: ["p"],
    async execute(message,args, cmd, client, Discord){
        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        if (message.content.includes('https://')){
            return client.distube.play(message, args.join(" "))
    }
    if(!args[0]) return message.channel.send('Please provide a song to play!')
        message.channel.send(`🔎 searching \`${args.join(" ")}\``).then(msg => {
                    
        client.distube.play(message, args.join(" ")).catch(err => {
            console.error(err)
            return msg.edit(`❌No results found for \`${args.join(" ")}\`!`)
            
        })

        })
      
       
    }
}