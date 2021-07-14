const { promptMessage } = require("../../functions");
const discord = require('discord.js')

module.exports = {
    name: "ban",
    category: "moderation",
    description: "bans the member",
    async execute(message,args, cmd, client, Discord){
        const toBan = message.mentions.members.first();
        if (!args[0]) {
            return message.reply("Please provide a person to ban.")
         }
         if(!toBan){
             return message.reply("Please mention a member to ban!")
         }
         message.channel.send(`type a reason to ban ${message.mentions.users.first()} below`)
         const filter = (m) => m.author.id === message.author.id
         const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000 });
         
         collector.on('collect', async (m) => {
             message.channel.send(`Banning member...`)
        
         


        
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ You do not have permissions to ban members. Please contact a staff member")
                
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ I do not have permissions to ban members. Please contact a staff member")
                
        }

        

        // No member found
        if (!toBan) {
            return message.reply("Couldn't find that member, try again")
                
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("You can't ban yourself...")
                }
        if (!toBan.bannable) {
            return message.reply("I can't ban that person due to there high role")

        }
        
        const embed = new discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**- baned member:** ${toBan}
            **- baned by:** ${message.member}
            **- Reason:** ${m.content}`);

        const promptEmbed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to ban ${toBan}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                

                toBan.ban()
                    .catch(err => {
                        if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`)
                    });
                    try{
                        const banned = new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`banned`)
                        .setDescription(`you have been banned from \`${message.guild.name}\`
                        **- By: **${message.author}
                        **- reason: **${m.content}`)
                        toBan.send(banned)
                    }catch(err){
                        
                    }

                message.channel.send(embed);
            } else if (emoji === "❌") {
                msg.delete()
                message.channel.send(`ban canceled.`)
            }
        });
    });
    }
};