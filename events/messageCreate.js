const { ChannelType } = require('discord.js');
const client = require('..');
const prefix = client.prefix;

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // if message author is a bot then return
    if (message.channel.type != ChannelType.GuildText) return; // if message channel type is not equals to text channel then return
    if (!message.content.startsWith(prefix)) return; // if message is not start with prefix then return

    const args = message.content.slice(prefix.length).trim().split(/ +/g); // slice the prefix of the message content, and trim the first space, split the message content by space and form array
    const cmd = args.shift().toLowerCase(); // command name to lower case

    if (cmd.length == 0) return; // if the cmd string length is equals to 0 then return
    let command = client.commands.get(cmd); // get the command object from collection
    if (!command) command = client.commands.get(client.aliases.get(cmd)); 
    // if it can't find command with the message content in commands collection, then find the command in aliases collection and use the value of the object get from aliases collection to get the object in commands collection

    if (command) {
        try {
            command.run(client, message, args);
        } catch (error) {
            console.log(error);
        }
    }
});