module.exports = {
    name: 'shop',
    description: '',
    aliases: ["sh"],
    async execute(message, args, cmd, client, Discord, profileData, settings) {
        
        const shop1 = new Discord.MessageEmbed()
        .setTitle('Shop')
        .addField(`🍪 Cookie — **₪ 25**`, `this item is completely cosmetic for now`)
        .addField(`<:FishingRod:816342491111882782> Fishing Rod — **₪ 10,000**`, `buying this will unlock \`${settings.prefix}fish\``)
        .addField(`coming soon . . . `, `coming soon`)
        .addField(`coming soon . . . `, `coming soon`)
        .setFooter('page 1/1')
        message.channel.send(shop1);

    }

}