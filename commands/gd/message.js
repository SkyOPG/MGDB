const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("send a message or embed to the channel given")
    .addChannelOption(option => option.setName('channel').setDescription('channel to send the message/embed').setRequired(true))
    .addBooleanOption(option => option.setName("embed").setDescription('is it an embed?').setRequired(true))
    .addStringOption(option => option.setName("content").setDescription("message content"))
    .addStringOption(option => option.setName("title").setDescription("title of embed"))
    .addStringOption(option => option.setName("desc").setDescription("desc of embed"))
    .addStringOption(option => option.setName("footer").setDescription("footer of embed")),
    async execute(interaction, client){
        if(!allowedUsers.includes(interaction.user.id)) return interaction.reply("You are not one of the DL moderators, thus you can't use this command")
        const { options } = interaction;
        const isEmbed = options.getBoolean("embed");
        const content = options.getString("content");
        const title = options.getString("title");
        const desc = options.getString("desc");
        const footer = options.getString("footer");
        const channel = options.getChannel('channel');

        try{
            if(isEmbed){
            const embed = new EmbedBuilder();
            if(title !== null) embed.setTitle(`${title}`);
            if(desc !== null) embed.setDescription(`${desc}`);
            if(footer !== null) embed.setFooter({ text: `${footer}` });
            if(content !== null){
                await interaction.reply({ content: 'done', ephemeral: true })
                channel.send({ content: `${content}`, embeds: [embed] })
            } else {
                await interaction.reply({ content: 'done', ephemeral: true })
                channel.send({ embeds: [embed] })
            }
        } else {
            if(content){
                await channel.send({ content: `${content}` })
            }
        }
    } catch(err) {
        console.log(err)
    }
    }

}