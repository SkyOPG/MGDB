const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const db = require('../../db/levels.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('easy-demon')
    .setDescription("shows an easy demon"),
    async execute(interaction){
        let i = Math.floor(Math.random() * db.demons.easy.length);
        const easy = db.demons.easy[i];
        const embed = new EmbedBuilder()
        .setTitle("Found Demon")
        .setDescription(`**Here's a fun easy demon you should beat!**\n\n\`\`\`\nLevel name: ${easy.name}\n\nLevel ID: ${easy.id}\n\`\`\``)
        .setColor("Blue")
        .setThumbnail(interaction.client.user.displayAvatarURL());
        await interaction.reply({ embeds: [embed] })
        
    }
}