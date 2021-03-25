const discord = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme",
    async execute(message,args, cmd, client, Discord) {
        const got = require('got')
  
        
                const subreddits = ['dankmemes', 'me_irl']
        
                const index = Math.floor(Math.random() * subreddits.length)
        
                    got(`https://www.reddit.com/r/${subreddits[index]}/random/.json`).then(response => {
                    let content = JSON.parse(response.body)
                    let permaLink = content[0].data.children[0].data.permalink
                    let memeUrl = `https://reddit.com${permaLink}`;
                    let memeImage = content[0].data.children[0].data.url;
                    let memeTitle = content[0].data.children[0].data.title;
                    let memeUpvotes = content[0].data.children[0].data.ups;
                    let memeDownvotes = content[0].data.children[0].data.downs;
                    let memeNumComments = content[0].data.children[0].data.num_comments;
            
                    const memeEmbed = new Discord.MessageEmbed()
                    .setTitle(`${memeTitle}`)
                    .setURL(`${memeUrl}`)
                    .setImage(memeImage, ({
                        dynamic: true
                    }))
                    .setColor('RANDOM')
                    .setFooter(`👍${memeUpvotes} 👎${memeDownvotes} 💬${memeNumComments}`)
            
                    message.channel.send(memeEmbed)
            
                })
        
            }
}