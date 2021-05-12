const { MesssageCollector } = require('discord.js')

module.exports = {
    name: "embed",
    description: "make embed",

    async execute(message,args, cmd, client, Discord) {
        let title = 0
        let description = 0
        
        const filter = (m) => m.author.id === message.author.id
        const collector = message.channel.createMessageCollector(filter, { max: 2, time: 15000 });
        message.channel.send('Now type your title!').then(() =>{})
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
            .setTitle(`creating embed...`)
            .setColor("2F3136");
            message.channel.send(creatingembed).then((msg)=>{
               
                
                const embed = new Discord.MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setFooter(`Embed created by ${message.author.username}`)
                .setColor("RANDOM")
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
