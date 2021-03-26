const { MesssageCollector } = require('discord.js')

module.exports = {
    name: "embed",
    description: "make embed",

    async execute(message,args, cmd, client, Discord) {
        let title = 0
        let description = 0
        
        const filter = (m) => m.author.id === message.author.id
        const collector = message.channel.createMessageCollector(filter, { max: 2, time: 15000 });
        message.channel.send('please provid a title').then(() =>{})
        let deleted = 0;
        collector.on('collect', m => {
            
            if(title == '0'){
                const deltetitle = message.id
              
                title = m.content
                m.delete();
                return message.channel.send(`Your title has been set to \`${m.content}\`, now please provide a description`).then( msgg =>{ 
                 })
            }
            if(description == '0'){
                const deletedescription = message.id
                description = m.content
                m.delete();
            }
            const creatingembed = new Discord.MessageEmbed()
            .setTitle(`creating embed...`);
            message.channel.send(creatingembed).then((msg)=>{
               
                
                const embed = new Discord.MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setFooter(`Embed created by ${message.author.username}`)
              setTimeout(() => {
                msg.delete();
                message.channel.send(embed)

      

                
              
              }, 1000);
            })



            
        });
        
        collector.on('end', collected => {       
        });
     
          
    }
}
//         if(!message.member.hasPermission('MANNAGE_MESSAGES')) return // if the member does not have permissions to mannage messages, return/stop reading the code.
//         let title = args[0] // args[0] is the first word or number after the command name
//         let color = args[1] 
//         let description = args.slice(2).join(" ") // args.slice(2).join(" ") means we're taking all the arguments including and after the second argument. An argument is just a word or number.
//         const error = new Discord.MessageEmbed() 
//         .setColor('RANDOM')
//         .setTitle('**❌ERROR INVALID ARGS**')
//         .setDescription('`!embed, title(one word), color(hex code or basic colors in caps; i.e(YELLOW), description(embed body))`')

//         if(!title) return message.channel.send(error) // ! means no, so if there's no title, return and send the error embed
//         if(!color) return message.channel.send(error)
//         if(!description) return message.channel.send(error)


//         const embed = new Discord.MessageEmbed()
//         .setTitle(`**${title}**`)
//         .setColor(color)
//         .setDescription(description)
//         .setFooter(`Embed created by ${message.author.username}`)
//         message.delete() // this deletes the command

//         message.channel.send(embed)
//     }
// }
    
