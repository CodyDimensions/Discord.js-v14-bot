const client = require('..');
const { ActivityType } = require('discord.js');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`.brightMagenta.underline)

    // set activity status
    client.user.setActivity('Dimensions', {
        type: ActivityType.Listening
    });

    client.user.setStatus('dnd');
});