// const { REST } = require("@discordjs/rest");
// const Routes = require("discord-api-types/v10");
const { REST, Routes } = require('discord.js');
fs = require("fs");

module.exports = (client) => {
  client.handleCommands = async () => {

    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
      }
    }

    const clientId = process.env.ClientID;
    const guildId = "816337962685956106"
    const rest = new REST({ version: "10" }).setToken(process.env.token);
    (async () => {
        try {
            console.log(`Started refreshing ${client.commandArray.length} application (/) commands.`);
    
           
            const data = await rest.put(
                Routes.applicationCommands(clientId),
                { body: client.commandArray },
            );
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();
  };
};
