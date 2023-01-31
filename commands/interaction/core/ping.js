const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription("Check bot's ping"),
    run: async (client, interaction) => {
        await interaction.reply({ content: 'Pinging...', fetchReply: true });
        await interaction.editReply({ content: `🏓 Pong! **${client.ws.ping} ms**`, fetchReply: true });
    }
}