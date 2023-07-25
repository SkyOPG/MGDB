const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const db = require("../../db/progress.json");
const fs = require('fs')
const builder = new SlashCommandBuilder()
.setName("progress")
.setDescription("manage user progress")
.addSubcommand(sub => 
    sub
    .setName("set")
    .setDescription("sets an existing progress")
    .addStringOption(option =>
        option
        .setName("date")
        .setDescription("the date of the progress to edit")
        .setRequired(true))
    .addStringOption(option =>
        option
        .setName("percentage")
        .setDescription('your new daily progress')
        .setRequired(true)))
.addSubcommand(sub =>
    sub
    .setName("add")
    .setDescription("adds a new progress"))
.addSubcommand(sub =>
    sub
    .setName("list")
    .setDescription("lists all available progresses for a user"));

    function getUserIndex(username, data) {
        return data.findIndex((user) => user.user === username);
      }
      
      function updateProgress(username, date, newPercentage, message) {
        try {
          let rawData = fs.readFileSync('./db/progress.json');
          let data = JSON.parse(rawData);
      
          const userIndex = getUserIndex(username, data);
          if (userIndex === -1) {
            message.channel.send('Error: User not found in the progress database.');
            return;
          }
      
          const user = data[userIndex];
          const progressIndex = user.progresses.findIndex(
            (progress) => progress.date === date
          );
      
          if (progressIndex === -1) {
            message.channel.send('Error: Date not found for the user.');
            return;
          }
      
          data[userIndex].progresses[progressIndex].percentages = newPercentage;
      
          fs.writeFileSync('./db/progress.json', JSON.stringify(data, null, 2));
          message.channel.send('Progress updated successfully.');
        } catch (err) {
          console.log('Error:', err.message);
        }
      }

module.exports = {
    data: builder,
    async execute(client, interaction){
        console.log("a")
        const sub = interaction.options.getSubcommand()

        switch(sub){
            case "set": {
                const username = interaction.user.username;
                const date = interaction.options.getString("date");
                const percentage = interaction.options.getString("percentage");
                await interaction.reply("Done, check embed");
                updateProgress(username, date, percentage, interaction);
            } break;
        }
    }
}