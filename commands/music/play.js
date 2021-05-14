module.exports = {
    name: "play",
    aliases: ["p"],
    async execute(message,args, cmd, client, Discord){

        if (!message.member.voice.channel) return message.channel.send('**You must be in a voice channel to use this command!**');
        const dFetch = await fetch(`https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n/tracks?market=ES&fields=items(added_by.id%2Ctrack(name%2Chref%2Calbum(name%2Chref)))&limit=10&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQA_Hw4lojHfTl2KSZHDTgxAkYXqT0tqrrVAz9sMqMIDJXuUWfUi2antFs8o4EKBlu6wNOaZsJ3XgPPx-6-js2zC_Gz6O8adLBsQgWaDOHwnGsUFRtosXFqxz2RJFxiroIccfhowb1L73tm9h5XzeDAafBC8l9g`);
        const data = await dFetch.json();
        console.log(data)
        if (message.content.includes('https://')){
            return client.distube.play(message, args.join(' '))
    }
            

    if(!args[0]) return message.channel.send('**Please provide a song to play!**')
        message.channel.send(`🔎 searching \`${args.join(" ")}\``).then(msg => {
                    
        client.distube.play(message, args.join(" ")).catch(err => {
            console.error(err)
            return msg.edit(`❌No results found for \`${args.join(" ")}\`!`)
            
        })

        })
      
       
    }
}