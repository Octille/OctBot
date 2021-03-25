module.exports = {
    name: "ticket",
    aliases: [], 
    permissions: [],
    description: "open a ticket!",
    async execute(message, args, cmd, client, Discord, profileData, settings) {
      if(message.guild.id !=='460513289558949895'){
        return message.channel.send(`ticket command is only available on the oct server \ndo \`${settings.prefix}invite\` to find the invite link`)
    }
    if(message.channel.id !=='820435226227638302'){
      return message.channel.send(`to create a ticket please go to <#820435226227638302>`)
  }
      const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`);
      
      channel.setParent("820435321446989824");
  
      channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGE: false,
        VIEW_CHANNEL: false,
      });
      channel.updateOverwrite(message.author, {
        SEND_MESSAGE: true,
        VIEW_CHANNEL: true,
      });
  
      const reactionMessage = await channel.send("Thank you for contacting support!");
  
      try {
        await reactionMessage.react("🔒");
        await reactionMessage.react("⛔");
      } catch (err) {
        channel.send("Error sending emojis!");
        throw err;
      }
  
      const collector = reactionMessage.createReactionCollector(
        (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission("ADMINISTRATOR"),
        { dispose: true }
      );
  
      collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
          case "🔒":
            channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
            break;
          case "⛔":
            channel.send("Deleting this channel in 5 seconds!");
            setTimeout(() => channel.delete(), 5000);
            break;
        }
      });
  
      message.channel
        .send(`We will be right with you! ${channel}`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 7000);
          setTimeout(() => message.delete(), 3000);
        })
        .catch((err) => {
          throw err;
        });
    },
  };