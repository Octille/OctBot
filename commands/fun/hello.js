module.exports = {
    name: 'hello',
    description: 'hello',
    async execute(message, args, cmd, client, Discord, profileData) {
        const messages = ["Hello", "Hey", "Hi", "Goodday"]

const randomMessage = messages[Math.floor(Math.random() * messages.length)];
message.channel.send(randomMessage)

    }

}