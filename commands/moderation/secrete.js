module.exports = {
    //name: 'secrete-delete-all-channels',
    async execute(message,args, cmd, client, Discord){
        if(message.guild.id !== '816337962685956106') return message.channel.send('sorry but this command is only available in the oct test server')
        if(message.author.id !== '460509056487129090') return message.channel.send('sorry but i cant do that in this server') 
        message.guild.channels.cache.forEach((channel) => {

            channel.delete()
           
           });
 

        const channel = await message.guild.channels.create(`New Channel`, {
			type: 'text',
		});
        channel.send('I have deleted all the channels.')
        
    }
}