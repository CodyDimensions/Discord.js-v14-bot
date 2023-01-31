const { EmbedBuilder } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return; // if it is not slash command interaction then return

    const slashCommand = client.slashCommands.get(interaction.commandName); // get slash command from collection
    if (!slashCommand) return client.slashCommands.delete(interaction.commandName); // if it can't find slash command name from collection then delete from colleciton and return

    try {
        await slashCommand.run(client, interaction);
    } catch (error) {
        const errorEmbed = new EmbedBuilder()
        .setTitle('Error! Try again later!')
        .setColor('Red')
        .setDescription(`\`\`\`fix\n${error.message}\`\`\``)
        .setTimestamp();
        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });

        console.log(error);
    }
});