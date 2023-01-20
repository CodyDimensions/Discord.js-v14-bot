module.exports = {
    name: 'ping',
    description: "Check bot's ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send('Pinging...');
        await msg.edit(`🏓 Pong! **${client.ws.ping} ms**`);
    }
}