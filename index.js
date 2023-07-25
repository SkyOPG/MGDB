const { GDClient } = require("./structs/client");
const config = require("./config/config");
const { SlashCommandBuilder } = require('discord.js')

const builder = new SlashCommandBuilder()
.setName("progress")
.setDescription('dio')
.addSubcommand(sub => 
    sub
    .setName("lol")
    .setDescription('a'));
    console.log(`${JSON.stringify(builder)}`)

const gdclient = new GDClient({
    intents: ["Guilds"]
})

gdclient.deploy();

gdclient.on("ready", () =>  {
    gdclient.user.setPresence({ activities: [{ name: "Geometry Dash" }], status: "idle" })
    console.log("ready!")
})

gdclient.on("interactionCreate", async (interaction) => {
    console.log(gdclient.commands)
    if(interaction.isChatInputCommand()){
        const cmd = gdclient.commads.get(interaction.commandName);
        if (!cmd) {
			await interaction.reply({ content: "Command not found", ephemeral: true });
			return;
		}

        try {
            await cmd.execute(interaction, gdclient);
        } catch(err){
            await interaction.reply({ content: "An error occured", ephemeral: true })
            console.error(err)
        }
    }
})
process.on("unhandledRejection", () => {})

gdclient.login(config.token)