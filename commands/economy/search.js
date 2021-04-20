const PROFILE_MODEL = require("../../models/profileSchema");

module.exports = {
  name: "search",
  aliases: [],
  cooldown: 45,
  execute(message, args, alias, client, discord, pfdata) {
    const LOCATIONS = [
      "car",
      "sock",
      "milk",
      "wallet",
      "box",
      "pocket",
      "bus",
      "gutters",
      "park",
      "train",
      "lounge",
      "keyboard",
      "picnic",
      "bathroom",
      "bed",
      "sofa",
      "backpack",
      "laptop",
      "oculus",
      "shirt",
    ];

    let chosenLocations = LOCATIONS.sort(() => Math.random() - Math.random()).slice(0, 3);

    const RANDOM_NUMBER = Math.floor(Math.random() * (2500 - 100 + 1)) + 100;

    const FILTER = (m) => {
      return chosenLocations.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
    };

    const COLLECTOR = message.channel.createMessageCollector(FILTER, { max: 1, time: 15000 });
    const locations = new discord.MessageEmbed()
    .setTitle(`${message.author.username} where location would you like to search? 🔍`)
    .setDescription(`Type the location in this channel.\n\`${chosenLocations.join("` `")}\``)
    .setFooter('you only have 15 seconds to search!')
    .setColor("RANDOM")

    message.channel.send(locations);

    COLLECTOR.on("collect", async (m) => {
      const EMBED = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.author.username} searched the **${m.content}**`)
        .setDescription(`${message.author.username} found **₪ ${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}**!`)
        .setFooter('nice detective work!')
      await PROFILE_MODEL.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: RANDOM_NUMBER,
          },
        }
      );
      message.channel.send(EMBED);
    });

    COLLECTOR.on("end", (collected) => {
      if (collected.size == 0) {
        return message.channel.send(
          `What are you doing <@${message.author.id}>?! you could of got **₪ ${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}** hidden inside the **${chosenLocations[0]}**!`
        );
      }
    });

  },
};
