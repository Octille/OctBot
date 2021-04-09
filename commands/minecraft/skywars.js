const Discord = require('discord.js');

module.exports = {
    name: 'skywars',
    aliases: ['sw'],
    async execute(message, args, cmd, client, Discord, profileData, settings, hypixel) {
        let name = args.join(" ");
        
        hypixel.getPlayer(name).then(async (player) => {
          if(!player) return;
          let game = player.stats
          const embed = new Discord.MessageEmbed()
          .setAuthor(player.nickname)
          .setDescription("Skywars stats")
          .addField('Total Games', `${game.skywars.playedGames}`, true)
          .addField('Wins', `${game.skywars.wins}`, true)
          .addField('WinStreak', `${game.skywars.winstreak}`, true)
          .addField('Kills', `${game.skywars.kills}`, true)
          .addField('Coins', `${game.skywars.coins}`, true)
          .addField('Tokens', `${game.skywars.tokens}`, true)
          .addField('Heads', `${game.skywars.heads}`, true)
          .addField('Opals', `${game.skywars.opals}`, true)
          .addField('Avarice', `${game.skywars.avarice}`, true)
          .addField('Tenacity', `${game.skywars.tenacity}`, true)
          .addField('Shards', `${game.skywars.shards}`, true)
          .addField('Level', `${game.skywars.level}`, true)
          .addField('Level Progress', `**current xp**: ${game.skywars.levelProgress.currentLevelXp}\n**Xp needed**: ${game.skywars.levelProgress.xpToNextLevel}\n**Progress**: ${game.skywars.levelProgress.percent}%`, true)
          .addField('Prestige', `${game.skywars.prestige}`, true)
          .addField('Prestige Icon', `${game.skywars.prestigeIcon}`, true)
          .addField('Solo', `**WinStreak**: ${game.skywars.solo.overall.winstreak}
          **Games Played**: ${game.skywars.solo.overall.playedGames}
          **Kills**: ${game.skywars.solo.overall.kills}
          **Wins**: ${game.skywars.solo.overall.wins}
          **Losses**: ${game.skywars.solo.overall.losses}
          **Deaths**: ${game.skywars.solo.overall.deaths}
          **KDR**: ${game.skywars.solo.overall.KDRatio}
          **WLRatio**: ${game.skywars.solo.overall.WLRatio}`, true)
          .addField('Team', `**WinStreak**: ${game.skywars.team.overall.winstreak}
          **Games Played**: ${game.skywars.team.overall.playedGames}
          **Kills**: ${game.skywars.team.overall.kills}
          **Wins**: ${game.skywars.team.overall.wins}
          **Losses**: ${game.skywars.team.overall.losses}
          **Deaths**: ${game.skywars.team.overall.deaths}
          **KDR**: ${game.skywars.team.overall.KDRatio}
          **WLRatio**: ${game.skywars.team.overall.WLRatio}`, true)
          .addField('Ranked', `**WinStreak**: ${game.skywars.ranked.winstreak}
          **Games Played**: ${game.skywars.ranked.playedGames}
          **Kills**: ${game.skywars.ranked.kills}
          **Wins**: ${game.skywars.ranked.wins}
          **Losses**: ${game.skywars.ranked.losses}
          **Deaths**: ${game.skywars.ranked.deaths}
          **KDR**: ${game.skywars.ranked.KDRatio}
          **WLRatio**: ${game.skywars.ranked.WLRatio}`, true)
          .addField('Mega', `**WinStreak**: ${game.skywars.mega.overall.winstreak}
          **Games Played**: ${game.skywars.mega.overall.playedGames}
          **Kills**: ${game.skywars.mega.overall.kills}
          **Wins**: ${game.skywars.mega.overall.wins}
          **Losses**: ${game.skywars.mega.overall.losses}
          **Deaths**: ${game.skywars.mega.overall.deaths}
          **KDR**: ${game.skywars.mega.overall.KDRatio}
          **WLRatio**: ${game.skywars.mega.overall.WLRatio}`, true)
          .addField('Lab', `**WinStreak**: ${game.skywars.lab.winstreak}
          **Games Played**: ${game.skywars.lab.playedGames}
          **Kills**: ${game.skywars.lab.kills}
          **Wins**: ${game.skywars.lab.wins}
          **Losses**: ${game.skywars.lab.losses}
          **Deaths**: ${game.skywars.lab.deaths}
          **KDR**: ${game.skywars.lab.KDRatio}
          **WLRatio**: ${game.skywars.lab.WLRatio}`, true)
          .setThumbnail(`http://cravatar.eu/helmhead/${name}.png`)
          if (player.isOnline != false){
            embed.setColor("#51eb39")
            embed.setFooter("User is currently online")
          }else{
            embed.setColor("#eb3939")
            embed.setFooter("User is currently offline")
          }
          message.channel.send({embed})
      }).catch((err) => {
          message.reply("The player you specified doesn't exist or hasn't joined the hypixel network")
      })

    },
}