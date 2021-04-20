
const profileModel = require("../../models/profileSchema");
const cooldowns = new Map();
const Guild = require('../../models/guild');
const counting = require('../../models/Counting');
const mongoose = require('mongoose');


module.exports = async(Discord, client, message) => {


  if(message.channel.id == '820435226227638302'){    
    if(message.content !== `!ticket`){
      if(message.author.id !== client.user.id){
        return message.delete()
      }
    }
    if(message.author.id !== client.user.id){
      message.delete()
    }
  }
  if (message.author.bot) return;
  if(message.channel.id == '832060827866759228'){
    const countingdata = await counting.findOne({
      guild: message.guild.id
  }) 
    const currentnumber = countingdata.number
    const number = message.content
    const numberneeded = +currentnumber + +1
    if(number !== `${numberneeded}`){
      try{
        message.delete()
        const wrongnumber = new Discord.MessageEmbed()
        .setTitle(`Wrong number!`)
        .setDescription(`hint: ${numberneeded}`)
        .setColor("RANDOM")
        message.author.send(wrongnumber)
        return;
      }catch (err) {
        return message.delete()
      }
      
    }
    await counting.findOneAndUpdate(
      {
        guild: message.guild.id,
      },
      {
        $set: {
          "number" : number,
      },
    },
    );
    return;
  }


  const user = message.author;




  const settings = await Guild.findOne({
    guildID: message.guild.id
}, (err, guild) => {
    if (err) console.error(err)
    if (!guild) {
        const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            prefix: process.env.PREFIX,
            InviteLinks: 0,

        })

        newGuild.save()
        .then(result => console.log(result))
        .catch(err => console.error(err));

        return message.channel.send('This server was not in our database! We have now added and you should be able to use bot commands.').then(m => m.delete({timeout: 10000}));
    }
});

if (message.content.includes('discord.gg/'||'discordapp.com/invite/')){ 
  if(settings.InviteLinks < 1){ //if it contains an invite link
    message.delete()
    message.channel.send(`${user} Invite links are not allowed on this server`)
  }}

  if (message.mentions.has(client.user.id)) {
    let welcome = settings.WelcomeCID
    let invitelinks = 'off'
    if(settings.InviteLinks == '1'){
      invitelinks = 'on'
    }
    if(settings.WelcomeCID == null){
      welcome = 'no welcome message setup'
    }
    const embed = new Discord.MessageEmbed()
    .setTitle('oh, looks like i was mentioned here are my settings:')
    .setDescription(`Prefix:\`${settings.prefix}\`\nWelcomeCID:\`${welcome}\`\nInvite Links:\`${invitelinks}\``)
    return message.channel.send(embed);
};


try{
    let prefix = settings.prefix;
   

    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        userID: message.author.id,
        serverID: message.guild.id,
        coins: 1000,
        bank: 0,
        Company: {
           miners: 0,
           workers: 0 
          },
          Items: {
            Shirt: 1,
            Pants: 1,
        },
        cooldowns: 
        {
      id: message.author.id,
        }

        
    
          
          
        
      });
      profile.save();
      message.lineReply(`oh no! looks like you wernt in my database but dont worry i have added you now you can use my commands.`)
    }
  } catch (err) {

  }

  if(profileData.coins < 0){
    message.channel.send('looks like you lost all your coins and has a stroke, you paid the hostpital half your bank')
    const bank = profileData.bank
     
    let half = bank * 0.5;
    if(bank < 2){
      half = 0;
    }
    await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
        bank: -half,
      },
    },
    );
    await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
          $set: {
            coins: 0,
          },
        },
      
      );
      return;
  }


  const Topgg = require('@top-gg/sdk')
  const api = new Topgg.Api('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0MTc3NjQ3MzYxMzkyNjQ5MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjE3NjQ3NTEwfQ.x80_MtabwYpjf5egoAaIxs41pDDm-l0WXoazxdpM2dA')
  const NotClaimed = 'NotClaimed'
  const Claimed = 'Claimed'

  let voted = api.hasVoted(message.author.id)
  if(voted){
    if(profileData.topggrewards !== Claimed){
      await profileData.updateOne(
        {
          $inc :{
            coins: 10000000,
          },
        }
      );
    await profileData.updateOne(
      {
        $set :{
          topggrewards: 'Claimed',
        },
      }
    );
    }
  }

       
  if(!voted) {
    await profileData.updateOne(
      {
        $set :{
          topggrewards: 'NotClaimed',
        },
      }
    );

  }
  
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {
        const profile = profileModel.findOneAndUpdate(       
        {
          userID: message.author.id,
        },
        {
          $set:{
          cooldowns: { commandname: `${command.name}` }
          }
          }
           
          )



      if(!cooldowns.has(command.name)){
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;
    if(time_stamps.has(message.author.id)){
        const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            var time_left = (expiration_time - current_time) / 1000 ;
            if(time_left > 60){
              time_left = time_left / 60
              if(time_left > 60){
                time_left = time_left / 60
                return message.reply(`Please wait \`${time_left.toFixed(1)}\` more hours before using the command ${command.name}`);
              }
              return message.reply(`Please wait \`${time_left.toFixed(1)}\` more min before using the command ${command.name}`);
            }

            

            return message.reply(`Please wait \`${time_left.toFixed(1)}\` more sec before using the command ${command.name}`);
        }
    }
  
    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    

  } catch (err) {
    return message.channel.send('command not found please refer to \`!help\`')}
 


    if(command) {
      if(message.channel.id == '685984967914029130'){
        if(message.member.roles.find(r => r.name === "Mod") || message.member.roles.find(r => rname === "Owner")){
          command.execute(message, args, cmd, client, Discord, profileData, settings)
      }
        return message.reply('sorry but commands are disabled on this channel please go to <#829014101467594823> or a diffrent channel on this server')
      } 
      else{
      command.execute(message, args, cmd, client, Discord, profileData, settings);
      }
    }


    
  }catch (err) {
    prefix = "!"
  }
   
}