import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { REST, Routes } = require('discord.js');

const config = require('./config.json');

const TOKEN = config.TOKEN;
const CLIENT_ID = config.CLIENT_ID;

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}
