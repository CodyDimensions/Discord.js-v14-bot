const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const client = new Client({
    intents: [ /* https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayIntentBits */
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences
    ],
    partials: [ /* https://discord.js.org/#/docs/discord.js/14.0.3/typedef/Partials */
        Partials.Message,
        Partials.User,
        Partials.Channel,
        Partials.GuildMember
    ]
});

require('dotenv').config(); // You need to reference dotenv in order to use .env

// now we gonna check if the bot is online by using the ready event listener
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)

    // set activity status
    client.user.setActivity('Dimensions', {
        type: ActivityType.Listening
    });

    client.user.setStatus('dnd');
});

client.login(process.env.TOKEN); // login the discord bot
