module.exports = {
    name: 'test',
    async execute(message, args, cmd, client, Discord){
        const msg = message.channel.send('test')
        msg.then(() =>{
            const msgid = msg.promise
            message.channel.send('works')
            console.log(msgid)
        }

        )
    }
}