const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const dl = require('../../db/dl.json')

const data = {
    data: new SlashCommandBuilder()
    .setName("dl-users")
    .setDescription("top Users in demon list"),
    async execute(interaction){
        const data = dl[0];
        const arr = new Array();
        for (const key in data) {
            const name = key;
            const value = data[key];
            const lol = dl[1];
            const demons = lol[key];
            const e = dl[2];
            const points = Math.floor(e[key]);

            arr.push({ name: `**${name}: ${value}**`, value: `> Demons: \`${demons}\`\n> Points: \`${points}\``, inline: true })
        }
        const a = arr.join("\n")
        const str = String(a);
        const embed = new EmbedBuilder()
        .setTitle("Users | Moroccan DL")
        .setDescription(`${str}`)
        .setColor("Blue")
        .setThumbnail(interaction.client.user.displayAvatarURL())

        await interaction.reply({ embeds: [{
            fields: arr,
            title: "Users | Moroccan DL",
            color: 3447003,
            thumbnail: {
                url: 'https://cdn.discordapp.com/avatars/1129381791178948619/83a253ea5f350ad3e40f64e6b1aa97ae.webp'
              }
        }] })
    }
}

module.exports = data;