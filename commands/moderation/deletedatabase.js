const profileModel = require("../../models/profileSchema");
module.exports = {
    name: 'deletedatabase',
    description: '',
    aliases: [" "],
    async execute(message, args, cmd, client, Discord, profileData) {
        if(message.author.id != "460509056487129090"){
            return message.channel.send('Only the owner can use this command!')
        }
        if(!args[0]){
            return message.channel.send(`please provide a user to remove from my database`)
        }
        const userm = message.mentions.users.first()
        let msgs = `success, ${userm} was removed from the database`
        
        
        try{
            
          
            const user = message.mentions.users.first().id
            const sad = await profileModel.findOne({userID: user})
            if(!sad){
                msgs = `that person is not even in my database ;-;`
                message.channel.send(`deleting ${userm} from my database...`).then((msg)=>{
                    setTimeout(() => {
                      msg.edit(msgs);
                    }, 1000);
                  })
                  return;
                }
           
        await profileModel.findOneAndDelete(
        {
            userID: user
        }
        )
        message.channel.send(`deleting ${userm} from my database...`).then((msg)=>{
            setTimeout(() => {
              msg.edit(msgs);
            }, 1000);
          })
    }catch(err){
        console.log(err)
   
    }

        
  
    }

}