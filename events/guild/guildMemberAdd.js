const profileModel = require("../../models/profileSchema");
const Canvas = require('canvas');
const path = require('path');
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');
	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
};
const Discord = require('discord.js');
const Guild = require('../../models/guild')
const { MessageAttachment } = require('discord.js')
module.exports = async (client, discord, member) => {
	try {
		const profileData = await profileModel.findOne({ userID: member.id, });
		if (!profileData) {
		  const profile = await profileModel.create({
			userID: member.id,
			serverID: member.guild.id,
			coins: 1000,
			bank: 0,
			Company: {
			   miners: 0,
			   workers: 0 
			  },
			  Items: {
			  placeholder: 0,
			  }
		  });
		  profile.save();
		}
	  } catch (err) {
		console.log(err);
	  }
	  
	const settings = await Guild.findOne({
		guildID: member.guild.id
	})
	if(!settings) return;







	  const canvas = Canvas.createCanvas(700, 250)
	  const ctx = canvas.getContext('2d')
  
	  const background = await Canvas.loadImage(
		path.join(__dirname, '../../wallpaper.jpg')
	  )
	  let x = 0
	  let y = 0
	  ctx.drawImage(background, x, y)
  
	  const pfp = await Canvas.loadImage(
		member.user.displayAvatarURL({
		  format: 'png',
		})
	  )
	  x = canvas.width / 2 - pfp.width / 2
	  y = 25
	  ctx.drawImage(pfp, x, y)
  
	  ctx.fillStyle = '#ffffff'
	  ctx.font = '35px sans-serif'
	  let text = `Welcome ${member.user.username}#${member.user.discriminator}`
	  x = canvas.width / 2 - ctx.measureText(text).width / 2
	  ctx.fillText(text, x, 60 + pfp.height)
  
	  ctx.font = '30px sans-serif'
	  text = `Member #${member.guild.memberCount}`
	  x = canvas.width / 2 - ctx.measureText(text).width / 2
	  ctx.fillText(text, x, 100 + pfp.height)
  
	  const attachment = new MessageAttachment(canvas.toBuffer(), 'Welcome.png')

	const WelcomeCID = settings.welcomeID
	if(WelcomeCID < 0) return;
	try{
	const channel = await member.guild.channels.cache.get(`${WelcomeCID}`)
		const welcomeembed = new Discord.MessageEmbed()
		.setColor("2F3136")
		.attachFiles(attachment)
		.setImage('attachment://Welcome.png');
		
		await channel.send(welcomeembed);
	} catch(err){
		return
	}



 
};