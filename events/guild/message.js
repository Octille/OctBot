
const profileModel = require("../../models/profileSchema");
const cooldowns = new Map();
const Guild = require('../../models/guild');
const counting = require('../../models/Counting');
const mongoose = require('mongoose');
const ms = require('ms');
const discord = require('discord.js')


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
    }
});

if (message.content.includes('discord.gg/'||'discordapp.com/invite/')){ 
  const invitelinkuser = message.member
  if(!invitelinkuser.hasPermission("MANAGE_MESSAGES")){  
  if(settings.InviteLinks < 1){ //if it contains an invite link
    message.delete()
    message.channel.send(`${user} Invite links are not allowed on this server!`)
  }
  }}

  if (message.mentions.has(client.user.id)) {
    if(!message) return

    let welcome = settings.welcomeID
    let invitelinks = 'off'
    if(settings.InviteLinks == '1'){
      invitelinks = 'on'
    }
    if(settings.welcomeID == null){
      welcome = 'no welcome message setup'
    }
    const embed = new Discord.MessageEmbed()
    .setTitle('You mentioned me:')
    .setDescription(`Prefix:\`${settings.prefix}\`\nWelcomeCID:\`${welcome}\`\nInvite Links:\`${invitelinks}\``)
    .setColor("2F3136")
    if(!message.content.includes('@everyone') && !message.content.includes('@here')){
      message.channel.send(embed);
    } 

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
        cooldownenabled: 0,
        Company: {
           miners: 0,
           workers: 0 
          },
          Items: {
            Shirt: 1,
            Pants: 1,
        },
        commands_cooldowns: []

        
    
          
          
        
      });
      profile.save();
        const firstjoinembed = new Discord.MessageEmbed()
        .setTitle('Welcome')
        .setDescription('Looks like this is your first time using Oct Bot i have set up some things for you and you are now able to use commands.')
        .setFooter(`To get started you can do \`${settings.prefix}help\``)
        .setColor('RANDOM')
      message.lineReply(firstjoinembed)
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

  let voted = await api.hasVoted(message.author.id)
  if(voted){
    if(profileData.topggrewards !== Claimed){
      await profileData.updateOne(
        {
          $inc :{
            coins: 500000,
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
    const rewardsclaimed = new Discord.MessageEmbed()
    .setTitle('Thank you for voting!')
    .setColor("GREEN")
    .setDescription('As a reward you get\n-**₪ 500,000**')
try{
  message.author.send(rewardsclaimed)
}catch (err) {

}
    const channel = await client.channels.cache.get(`834454460667265064`)
		await channel.send(`${message.author} has voted on top.gg and claimed their 500k coins`);
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


    if (!command) return;
    if(profileData.cooldownenabled === '1') return command.execute(message, args, cmd, client, Discord, profileData, settings);


      const COOLDOWN = profileData.commands_cooldowns.find((x) => x.name === command.name)
      if(COOLDOWN === undefined || !COOLDOWN){

      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $push:{
            commands_cooldowns: {
              name: command.name,
              time: Date.now(),
            }
          }
   
        }
      )
      }else{
        const command_cooldown = command.cooldown * 1000
        if(command_cooldown - (Date.now() - COOLDOWN.time) > 0){
          const TIME = ms(command_cooldown - (Date.now() - COOLDOWN.time))
          const embedcooldown = new Discord.MessageEmbed()
          .setTitle(`Woah, slow down`)
          .setDescription(`The command **${command.name}** is on cooldown for \`${TIME}\``)
          .setFooter('While you wait you can vote for oct bot on top.gg')
          .setColor("RANDOM");
          return message.channel.send(embedcooldown)
        }
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $pull:{
              commands_cooldowns: {
                name: command.name,
              }
            }
     
          }
        )
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $push:{
              commands_cooldowns: {
                name: command.name,
                time: Date.now(),
              }
            }
     
          }
        )

      }   
      if(command) command.execute(message, args, cmd, client, Discord, profileData, settings);
 
  }catch (err) {
    prefix = "!"
  }
   
}