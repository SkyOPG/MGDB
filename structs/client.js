const { Client, Collection, REST, Routes } = require("discord.js");
const config = require("../config/config.js");
const path = require('path');
const fs = require('fs')
const { token, clientId } = config;

module.exports = {
  GDClient: class DGC extends Client{
    constructor(options){
      super(options)
      this.commads = new Collection();
      this.deploy = function(){
        const commands = [];
        const foldersPath = path.join(__dirname, '../commands');
        const commandFolders = fs.readdirSync(foldersPath);
        
        for (const folder of commandFolders) {
          const commandsPath = path.join(foldersPath, folder);
          const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
          for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
              console.log(`Loaded ${file}`)
              this.commads.set(command.data.name, command)
              commands.push(command.data.toJSON());
            } else {
              console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
          }
        }
        
        const rest = new REST().setToken(token);
        
        (async () => {
          try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
        
            const data = await rest.put(
              Routes.applicationCommands(clientId),
              { body: commands },
            );
        
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
          } catch (error) {
            console.log(error);
          }
        })()
        }
    }
  }
}