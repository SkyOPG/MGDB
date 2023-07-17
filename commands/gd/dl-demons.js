const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const fs = require('fs')
const dl = require('../../db/dl.json')

const data = {
    data: new SlashCommandBuilder()
    .setName("dl-demons")
    .setDescription("Top beaten demons in the DL")
    .addNumberOption(option =>
        option.setName("page")
        .setDescription("page to see")
        .setRequired(true)),
    async execute(interaction){
        const d = new EmbedBuilder().addFields({ name: "a", value: "a", inline: true }).setTitle("hi").setColor("Blue").setThumbnail(interaction.client.user.displayAvatarURL())
        
        console.log(d.toJSON())
        const b = interaction.options.getNumber("page");
        const c = Number(b)
        const a = c - 1
        const arr = new Array();
        const db = dl.shift().shift().shift()
        let i = Number(a);
        for (const data in db) {
            const top = data["#"]
            const name = data["Level Name"];
            const ID = data["ID"]
            const points = Math.floor(data["Points"]);

            arr.push(`**#${top}: ${name}**\n> Points: \`${points}\`\n> ID: \`${ID}\` `)
        }
        const embed = new EmbedBuilder()
        .setTitle("Demons | Moroccan DL")
        .setDescription()
    }
}

module.exports = data;