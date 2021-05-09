const Discord = require('discord.js');

module.exports = {
    name : 'funnychat',
    description : 'sends a funny chat',
    execute(message, args, client) {
      let awnser;

        var array = [
            "1",
            "2",
            "3",   
        ]
            
            var randomAnswer = array[Math.floor(Math.random() * array.length)];

            if(randomAnswer == 1){
              awnser = "unknown 1: Im scared baby\n\nunknown 2: why is that\n\nunknown 1: That...One day you'll love someone other than me\n\nunknown 2: Too late for that, I will, and she looks just like you\n\nunknown 1: AWWWWWWWEEEEE =)=)=)...our daughter, you are so sweet, that's why I love you\n\nunknown 2: No your sister"
            }
            if(randomAnswer == 2){
              awnser = "Unknown 1: How are you doing\n\nUnknown 2: I'm Writing to the best girl in the world...\n\nUnknown 1: How lovely:heart_eyes::heart_eyes::heart_eyes:\n\nUnknown 2: She isnt answering. Thats why I'm writing to you"
            }
            if(randomAnswer == 3){
              awnser = "Unknown: Hey, Dave!\n\nDave: Don't talk to me:angry:\n\nUnknown:Why, what did I do\n\nDave: Last night,you were so drunk you got my Ipad and put it in the blender\n\nUnknown: Really?????\n\nDave:Yeah, and you said you were making apple juice"
            }
            const funnyembed = new Discord.MessageEmbed()
            .setTitle('Funny Chat')
            .setDescription(awnser)
            .setColor("RANDOM")
            .setFooter(`#${randomAnswer} out of 3`)
            
         message.channel.send(funnyembed);
    }
}