const { InteractionCollector } = require("discord.js");


module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {

    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        await interaction.reply({
          content: `Something went wrong.`,
          ephermeral: true,
        });
        console.error(error);
      }
    }
  },
};
