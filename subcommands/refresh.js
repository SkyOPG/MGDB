const { EmbedBuilder } = require('discord.js')
const DownDL = require('../db/xlsx').down
const { allowedUsers } = require("../config/config")

module.exports = {
    async execute(interaction){
        if(!allowedUsers.includes(interaction.user.id)) return interaction.reply("You are not one of the DL moderators, thus you can't use this command")
        await interaction.deferReply()
        try{
            await DownDL();
        await interaction.editReply({ embeds: [new EmbedBuilder().setTitle("Refreshed!").setDescription("the demon list got refreshed!\n\nINFO: the bot may get offline while applying the dl update").setColor("Blue")] })
        await interaction.client.destroy();
        process.exit(0);
        } catch {}
    }
}