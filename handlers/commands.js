const fs = require('fs');
const ascii = require('ascii-table');

module.exports = (client) => {
    let table = new ascii().setHeading('Commands', 'Load Status'); // create a ascii table

    fs.readdirSync('./commands/prefix/').forEach(dir => {
        const commands = fs.readdirSync(`./commands/prefix/${dir}/`).filter(file => file.endsWith('.js')) // filter out all the files ends with .js

        for (let file of commands) {
            let command = require(`../commands/prefix/${dir}/${file}`); // require the command file
            if (command.name) { // if the file exported the command name
                client.commands.set(command.name, command); // add command to collection with the command name as key and the object as value
                table.addRow(command.name, '✅ Success')
            } else { // if no command name
                table.addRow(file.split('.js')[0], '⛔ Failed')
                continue;
            }

            if (command.aliases && Array.isArray(command.aliases)) { // if aliases is exported from the file and the aliases property is array
                command.aliases.forEach((alias) => { // loop through the aliases array
                    client.aliases.set(alias, command.name) // add the alias to collection
                });
            }
        }
    });

    console.log(table.toString().brightGreen);
}