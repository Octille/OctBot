const Discord = require('discord.js');

module.exports = {
    name: 'duels',
    async execute(message, args, cmd, client, Discord, profileData, settings, hypixel) {
        let name = args.join(" ");
        
        hypixel.getPlayer(name).then(async (player) => {
          if(!player) return;
          let game = player.stats
          const embed = new Discord.MessageEmbed()
          .setAuthor(player.nickname)
          .setDescription("Duels Stats")
          .addField('Total Games', game.duels.playedGames, true)
          .addField('Wins', game.duels.wins, true)
          .addField('Kills', game.duels.kills, true)
          .addField('Coins', game.duels.coins, true)
          .addField('KDR', game.duels.KDRatio, true)
          .addField('Title', game.duels.title, true)
          .addField('UHC', `**Winstreak:** ${game.duels.uhc.overall.winstreak}
        **Kills:** ${game.duels.uhc.overall.kills}
        **Deaths:** ${game.duels.uhc.overall.deaths}
        **KDR:** ${game.duels.uhc.overall.KDRatio}
        **Wins:** ${game.duels.uhc.overall.wins}
        **Losses:** ${game.duels.uhc.overall.losses}
        **WLRatio:** ${game.duels.uhc.overall.WLRatio}
        **Games Played:** ${game.duels.uhc.overall.playedGames}`, true)
        .addField('MegaWalls', `**Winstreak:** ${game.duels.megawalls.winstreak}
        **Kills:** ${game.duels.megawalls.kills}
        **Deaths:** ${game.duels.megawalls.deaths}
        **KDR:** ${game.duels.megawalls.KDRatio}
        **Wins:** ${game.duels.megawalls.wins}
        **Losses:** ${game.duels.megawalls.losses}
        **WLRatio:** ${game.duels.megawalls.WLRatio}
        **Games Played:** ${game.duels.megawalls.playedGames}`, true)
        .addField('OP', `**Winstreak:** ${game.duels.op.overall.winstreak}
        **Kills:** ${game.duels.op.overall.kills}
        **Deaths:** ${game.duels.op.overall.deaths}
        **KDR:** ${game.duels.op.overall.KDRatio}
        **Wins:** ${game.duels.op.overall.wins}
        **Losses:** ${game.duels.op.overall.losses}
        **WLRatio:** ${game.duels.op.overall.WLRatio}
        **Games Played:** ${game.duels.op.overall.playedGames}`, true)
        .addField('SkyWars', `**Winstreak:** ${game.duels.skywars.overall.winstreak}
        **Kills:** ${game.duels.skywars.overall.kills}
        **Deaths:** ${game.duels.skywars.overall.deaths}
        **KDR:** ${game.duels.skywars.overall.KDRatio}
        **Wins:** ${game.duels.skywars.overall.wins}
        **Losses:** ${game.duels.skywars.overall.losses}
        **WLRatio:** ${game.duels.skywars.overall.WLRatio}
        **Games Played:** ${game.duels.skywars.overall.playedGames}`, true)
        .addField('Sumo', `**Winstreak:** ${game.duels.sumo.winstreak}
        **Kills:** ${game.duels.sumo.kills}
        **Deaths:** ${game.duels.sumo.deaths}
        **KDR:** ${game.duels.sumo.KDRatio}
        **Wins:** ${game.duels.sumo.wins}
        **Losses:** ${game.duels.sumo.losses}
        **WLRatio:** ${game.duels.sumo.WLRatio}
        **Games Played:** ${game.duels.sumo.playedGames}`, true)
        .addField('Classic', `**Winstreak:** ${game.duels.classic.winstreak}
        **Kills:** ${game.duels.classic.kills}
        **Deaths:** ${game.duels.classic.deaths}
        **KDR:** ${game.duels.classic.KDRatio}
        **Wins:** ${game.duels.classic.wins}
        **Losses:** ${game.duels.classic.losses}
        **WLRatio:** ${game.duels.classic.WLRatio}
        **Games Played:** ${game.duels.classic.playedGames}`, true)
        .addField('Combo', `**Winstreak:** ${game.duels.combo.winstreak}
        **Kills:** ${game.duels.combo.kills}
        **Deaths:** ${game.duels.combo.deaths}
        **KDR:** ${game.duels.combo.KDRatio}
        **Wins:** ${game.duels.combo.wins}
        **Losses:** ${game.duels.combo.losses}
        **WLRatio:** ${game.duels.combo.WLRatio}
        **Games Played:** ${game.duels.combo.playedGames}`, true)
        .addField('Bridge', `**Winstreak:** ${game.duels.bridge.overall.winstreak}
        **Kills:** ${game.duels.bridge.overall.kills}
        **Deaths:** ${game.duels.bridge.overall.deaths}
        **KDR:** ${game.duels.bridge.overall.KDRatio}
        **Wins:** ${game.duels.bridge.overall.wins}
        **Losses:** ${game.duels.bridge.overall.losses}
        **WLRatio:** ${game.duels.bridge.overall.WLRatio}
        **Games Played:** ${game.duels.bridge.overall.playedGames}`, true)
        .addField('Blitz', `**Winstreak:** ${game.duels.blitz.winstreak}
        **Kills:** ${game.duels.blitz.kills}
        **Deaths:** ${game.duels.blitz.deaths}
        **KDR:** ${game.duels.blitz.KDRatio}
        **Wins:** ${game.duels.blitz.wins}
        **Losses:** ${game.duels.blitz.losses}
        **WLRatio:** ${game.duels.blitz.WLRatio}
        **Games Played:** ${game.duels.blitz.playedGames}`, true)
        .addField('NoDebuff', `**Winstreak:** ${game.duels.nodebuff.winstreak}
        **Kills:** ${game.duels.nodebuff.kills}
        **Deaths:** ${game.duels.nodebuff.deaths}
        **KDR:** ${game.duels.nodebuff.KDRatio}
        **Wins:** ${game.duels.nodebuff.wins}
        **Losses:** ${game.duels.nodebuff.losses}
        **WLRatio:** ${game.duels.nodebuff.WLRatio}
        **Games Played:** ${game.duels.nodebuff.playedGames}`, true)
        .addField('Bow', `**Winstreak:** ${game.duels.bow.winstreak}
        **Kills:** ${game.duels.bow.kills}
        **Deaths:** ${game.duels.bow.deaths}
        **KDR:** ${game.duels.bow.KDRatio}
        **Wins:** ${game.duels.bow.wins}
        **Losses:** ${game.duels.bow.losses}
        **WLRatio:** ${game.duels.bow.WLRatio}
        **Games Played:** ${game.duels.bow.playedGames}`, true)
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