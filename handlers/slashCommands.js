const fs = require('fs');
const ascii = require('ascii-table');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const token = process.env.TOKEN;
const applicationID = process.env.APPLICATION_ID || null; // if you want to register slash commands with client ID, then empty APPLICATION_ID in .env
const clientID = process.env.CLIENT_ID || null; // if you want to register slash commands with application ID, then empty CLIENT_ID in .env
const guildID = process.env.GUILD_ID || null; // if you want global slash commands then empty the GUILD_ID in .env

module.exports = async (client) => {
    const slashCommands = []; // empty array

    let table = new ascii().setHeading('Slash Commands', 'Load Status');

    fs.readdirSync('./commands/interaction/').forEach(dir => {
        const folder = fs.readdirSync(`./commands/interaction/${dir}/`).filter(file => file.endsWith('.js')); // filter out the files ends with .js

        for (let file of folder) { // for loop, loop throught files in the folder
            let slashCommand = require(`../commands/interaction/${dir}/${file}`); // require the slash command file

            if (slashCommand.data.name) { // if the file has name property of the data object
                slashCommands.push(slashCommand.data);

                client.slashCommands.set(slashCommand.data.name, slashCommand); // add the slash command data to collection
                table.addRow(slashCommand.data.name, '✅ Success');
            } else {
                table.addRow(file.split('.js')[0], '⛔ Failed');
                continue;
            }
        }
    });
    console.log(table.toString().brightYellow)

    const rest = new REST({ version: '10' }).setToken(token);
    try {
        await rest.put(
            guildID ?
            Routes.applicationGuildCommands(applicationID || clientID, guildID) :
            Routes.applicationCommands(applicationID || clientID),
            { body: slashCommands }
        );
        console.log('✅ Registered Slash Commands.'.red);
    } catch (error) {
        console.log(error);
    }
}