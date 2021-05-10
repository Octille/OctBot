module.exports = {
    name: 'googlesearch',
    aliases: ["gs"],
    async execute(message,args, cmd, client, Discord){
        const q = args.join('+');
        message.channel.send(`https://www.google.com/search?q=${q}&btnI=`)
    }
}