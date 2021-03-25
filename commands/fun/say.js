module.exports = {
    name: "say",
    description: "says something",

    
    async execute(message,args, cmd, client, Discord){  
        message.delete();
        let say = args.slice(0).join(" ")
        if (message.content.includes("@everyone") || (message.content.includes("@here"))) return // if the message content includes @everyone OR ( || means or in js) @here, stop running the code. 
 
 
        if(!args[0]) return message.channel.send('Provide a message to say!');
        message.channel.send(say);
      

        }
    }