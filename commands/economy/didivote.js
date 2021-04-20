module.exports = {
    name: 'didivote',
    async execute(message, args, cmd, client){
        const Topgg = require('@top-gg/sdk')
        const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0MTc3NjQ3MzYxMzkyNjQ5MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE3NjQ3NTEwfQ.x80_MtabwYpjf5egoAaIxs41pDDm-l0WXoazxdpM2dA')
        console.log(api)
        let voted = await api.hasVoted(message.author.id)
        if(!voted){
            return message.channel.send(`you havnt voted D:`)
        }
        if(voted){
            return message.channel.send(`you have voted :D`)
        }
    }
}