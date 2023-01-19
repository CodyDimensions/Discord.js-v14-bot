const { Client, GatewayIntentBits, Partials, ActivityType, Collection } = require('discord.js');
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

const fs = require('fs');
var colors = require('colors');
require('dotenv').config(); // You need to reference dotenv in order to use .env

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.prefix = process.env.PREFIX;

// load the handlers
fs.readdirSync('./handlers').forEach((handler) => {
    require(`./handlers/${handler}`)(client)
})


client.login(process.env.TOKEN); // login the discord bot