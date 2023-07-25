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
          .setName("create")
          .setDescription("creates a new user"))
.addSubcommand(sub =>
    sub
    .setName("add")
    .setDescription("adds a new progress")
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
    .setName("list")
    .setDescription("lists all available progresses for a user")
    .addUserOption(option => 
      option
      .setName('user')
      .setDescription('user to list')
      .setRequired(true)))
.addSubcommand(sub =>
    sub
    .setName("view")
    .setDescription("view a progresses for a user")
    .addUserOption(option => 
        option
        .setName('user')
        .setDescription('user to view')
        .setRequired(true))
    .addStringOption(option =>
      option
      .setName("date")
      .setDescription("the date of the progress to view")
      .setRequired(true)));

    function getUserIndex(username, data) {
        return data.findIndex((user) => user.user === username);
      }

      async function viewProgressPercentages(username, date, i) {
        try {
          let rawData = fs.readFileSync('./db/progress.json');
          let data = JSON.parse(rawData);
      
          const userIndex = getUserIndex(username, data);
      
          if (userIndex === -1) {
            await i.reply('Error: User not found in progress.json.');
            return;
          }
      
          const user = data[userIndex];
          const progress = user.progresses.find((progress) => progress.date === date);
      
          if (!progress) {
            await i.reply('Error: Progress for the given date not found.');
            return;
          }
      
          await i.reply(`Progress for ${username} on ${date}: \`${progress.percentages}\``);
        } catch (err) {
          console.log('Error:', err.message);
        }
      }

      async function addNewProgress(username, date, percentages, i) {
        try {
          let rawData = fs.readFileSync('./db/progress.json');
          let data = JSON.parse(rawData);
      
          const userIndex = getUserIndex(username, data);
      
          if (userIndex === -1) {
            await i.reply('Error: User not found in progress.json.');
            return;
          }
      
          const newProgress = {
            date: date,
            percentages: percentages,
          };
      
          data[userIndex].progresses.push(newProgress);
      
          fs.writeFileSync('./db/progress.json', JSON.stringify(data, null, 2));
          await i.reply('Added new progress!');
        } catch (err) {
          console.log('Error:', err.message);
        }
      }
      
      async function updateProgress(username, date, newPercentage, message) {
        try {
          let rawData = fs.readFileSync('./db/progress.json');
          let data = JSON.parse(rawData);
      
          const userIndex = getUserIndex(username, data);
          if (userIndex === -1) {
            await message.reply('Error: User not found in the progress database.');
            return;
          }
      
          const user = data[userIndex];
          const progressIndex = user.progresses.findIndex(
            (progress) => progress.date === date
          );
      
          if (progressIndex === -1) {
            await message.reply('Error: Date not found for the user.');
            return;
          }
      
          data[userIndex].progresses[progressIndex].percentages = newPercentage;
      
          fs.writeFileSync('./db/progress.json', JSON.stringify(data, null, 2));
          await message.reply('Progress updated successfully.');
        } catch (err) {
          console.log('Error:', err.message);
        }
      }
      async function createNewUser(username, discrim, date, percentages, i) {
        try {
          let rawData = fs.readFileSync('./db/progress.json');
          let data = JSON.parse(rawData);
      
          const userIndex = getUserIndex(username, data);
      
          if (userIndex !== -1) {
            await i.reply('Error: User already exists in progress.json.');
            return;
          }
      
          const newUser = {
            user: username,
            discrim: discrim,
            progresses: [
              {
                date: date,
                percentages: percentages,
              },
            ],
          };
      
          data.push(newUser);
      
          fs.writeFileSync('./db/progress.json', JSON.stringify(data, null, 2));
          await i.reply('New user created successfully.');
        } catch (err) {
          console.log('Error:', err.message);
        }
      }
      
      async function getAvailableDatesForUser(username, discrim, i, client){
        try {
          let rawData = fs.readFileSync('./db/progress.json');
          let data = JSON.parse(rawData);
      
          const userIndex = getUserIndex(username, data);
      
          if (userIndex === -1) {
            await i.reply('Error: User not found.');
            return [];
          }
          const p = data[userIndex].progresses.map((progress) => progress.date)
      
          return await i.reply({ embeds: [new EmbedBuilder().setTitle('Available Dates').setColor("Blue").setThumbnail(client.user.displayAvatarURL()).setDescription(`${p.join("\n")}`)] }) 
        } catch (err) {
          console.log('Error:', err.message);
          return [];
        }
      }

module.exports = {
    data: builder,
    async execute(interaction, client){
        console.log("a")
        const sub = interaction.options.getSubcommand()

        switch(sub){
            case "set": {
                const username = interaction.user.username;
                const date = interaction.options.getString("date");
                const percentage = interaction.options.getString("percentage");
                await updateProgress(username, date, percentage, interaction);
            } break;
            case "create": {
                const username = interaction.user.username;
                const discrim = interaction.user.discriminator;
                await createNewUser(username, discrim, "creationdate", [], interaction);
            } break;
            case "add": {
                const username = interaction.user.username;
                const discrim = interaction.user.discriminator;
                const date = interaction.options.getString("date");
                const percentage = interaction.options.getString("percentage");
                console.log({ username, discrim })
                await addNewProgress(username, date, percentage, interaction)
            } break;
            case "list": {
              const username = interaction.user.username;
              const discrim = interaction.user.discriminator;
              await getAvailableDatesForUser(username, discrim, interaction, client);  
            } break;
            case "view": {
              const username = interaction.options.getUser("user").username;
              const date = interaction.options.getString("date");
              await viewProgressPercentages(username, date, interaction)
            } break;
        }
    }
}