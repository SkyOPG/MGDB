const { SlashCommandBuilder } = require('discord.js');
const users = require('../../subcommands/users');
const demons = require('../../subcommands/demons');
const refresh = require('../../subcommands/refresh');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dl")
    .setDescription("Demon list utilities")
    .addSubcommand(sub => 
        sub
        .setName("users")
        .setDescription("top Users in demon list")
        )
    .addSubcommand(sub => 
        sub
        .setName("demons")
        .setDescription("Top beaten demons in the DL")
        )
    .addSubcommand(sub =>
        sub
        .setName("refresh")
        .setDescription("refreshes the demon list")),
    async execute(interaction, client){
        const sub = interaction.options.getSubcommand()

        switch(sub){
            case "users": 
                users.execute(interaction, client);
            break;
            case "demons":
                demons.execute(interaction, client);
            break;
            case "refresh":
                refresh.execute(interaction, client);
            break;
        }
    }}