const chooseArr = ["2", "1",];
const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "beg",
  description: "beg for coins",
  cooldown: 60,

  
  async execute(message, args, cmd, client, discord, profileData) {
    

    var d = Math.random();
    if (d < 0.7)
    {
      const randomNumber = Math.floor(Math.random() * 500) + 1;
      const response = await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: randomNumber,
          },
          $set: {
            "cooldowns.Beg":  new Date(),
          }
        }
      );
     const messages = [`Charli D'Amelio threw **₪${randomNumber}** at you whilst dancing!`, `Ben Simmons shot a 3! Earning you **₪${randomNumber}**!`, `Your mom just donated **₪${randomNumber}** to the aids society which landed in your hands.`, `Steven Hawking just sent down **₪${randomNumber}** from heaven!`, `You decided that black lives matter and was donated **₪${randomNumber}**.`, `Gurkirat (developer) sent you **₪${randomNumber}**!`, `Someone *finally* liked your tiktok earning you **₪${randomNumber}**!`, `A fan blew **₪${randomNumber}** at you.`, `Your friend lent you **₪${randomNumber}**. Remember to return it.`, `Bella Poarch liked your tiktok and earned you fame! **₪${randomNumber}** was earned!`, `You woke up and it was time to go to school. Your alarm clock exploded releasing **₪${randomNumber}**.`, `Your laptop exploded in class and **₪${randomNumber}** fell out!`, `You robbed a bank for **₪${randomNumber}**!`, `You robbed a pawn shop for **₪${randomNumber}**.`, `You met Logan Paul and used it as clickbait earning you **₪${randomNumber}**.`, `You decided to go for a walk after finding out you cannot afford that new keyboard you wanted. You found **₪${randomNumber}** outside! Walking is great.`, `You became a Trump supporter earning you **₪${randomNumber}**. ***the dev is Canadian and neutral on the topic.***`, `You supported Biden and earned **₪${randomNumber}**! ***the dev is Canadian and is neutral on the topic.***`, `You uploaded a TikTok and you were able to pull **₪${randomNumber}** from creator fund!`, `You died and went to hell. After dying there you went to heaven. You were revived and paid **₪${randomNumber}** because of your GoFundMe page you made for free money... atleast it worked`, `You were eating a burrito and managed to swallow **₪${randomNumber}**. Hey, atleast you got to collect it afterwards.`, `**₪${randomNumber}**`, `You paid **₪${randomNumber + 100}** and earned **₪${randomNumber}**...`, `You sold your kidneys for a whopping **₪${randomNumber}**!`, `Stan Lee sent you **₪${randomNumber}** from the upper lands.`, `You decided black lives dont matter and that all lives matter. The developer sent you **₪${randomNumber}**.`, `You were given **₪${randomNumber}**! Try "!bal" to see it`, `Stop begging! well, here's **₪${randomNumber}** since you asked so kindly.`, `You earned **₪${randomNumber}** after becoming a slut...`, `Your Oct Bot balance has been reset. jk here's **₪${randomNumber}** to make up for that.`, `You just earned **₪${randomNumber}** after selling your left kidney on the white market.`, `You revealed Obama\'s last name earning you **₪${randomNumber}**.`, `You discovered a meteor and the US Government gave you a 2 million dollar grant for it. However, after taxes you brought home a WHOPPING **₪${randomNumber}**!!!`]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];

      return message.lineReply(randomMessage);
    }
    
        
    else if (d < 0.3)
        {
         
            const loss = Math.floor(Math.random() * 500) + 1;
            const response = await profileModel.findOneAndUpdate(
              {
                userID: message.author.id,
              },
              {
                $inc: {
                  coins: -loss,
                  
                },
                $set: {
                  "cooldowns.Beg":  new Date(),
                }
              }
            );
            const current_time = Date.now();
            const time_stamps = cooldowns.get(command.name);
            const cooldown_amount = (command.cooldown) * 1000;
        
            if(time_stamps.has(message.author.id)){
                const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
        
                if(current_time < expiration_time){
                    const time_left = (expiration_time - current_time) / 1000 ;
                }
              }
            
            
            const fail = [`You lost **₪ ${loss}** after crying like a whimp.`, `You decided to reword your sentence and it came out like, "take my money plz". You've lost **₪ ${loss}**.`, `You begged to hard and lost **₪ ${loss}**.`, `**₪ ${loss}** fell out of your pocket as you ran up to Pokimane to give it to her. She then called the police on you and you were arrested. What a noob, you only got 1 star before getting caught. You were then cancelled on twitter and became homeless.`, `You paid too much attention in class and lost **₪ ${loss}**!`, `You bought too much food to eat. The bill was **₪ ${loss}**.`, `**₪ ${loss}** was lost while inputting your card info online into wIsH.`, `The developer took **₪ ${loss}** because of your horribe behaviour today.`, `You paid **₪ ${loss}** after donating to a streamer.`, `Pokimane asked for **₪ ${loss}** and you paid up. What a simp.`, `You joined the "Who Wants To Be A Millionaire" show and got the first question wrong. After taxes, you lost **₪ ${loss}**`, `Your alarm clock exploded except this time you had to buy a new one that cost **₪ ${loss}**.`]
            const failrandomMessage = fail[Math.floor(Math.random() * fail.length)];
            message.lineReply(failrandomMessage)
    
        }
    
    

  },
};

