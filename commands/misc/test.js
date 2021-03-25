module.exports = {
    name: 'test',
    async execute(message,args, cmd, client, Discord) {
      
        const k = Math.floor(Math.random() * 5000) + 20000   
        console.log(`${k}`)
        message.channel.send(`${k}`)
    }
}