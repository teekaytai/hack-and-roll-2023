import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');

const config = require('./config.json');

const TOKEN = config.TOKEN;
const CLIENT_ID = config.CLIENT_ID;

import { commands, runners } from './commands.js';

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName in runners) {
        await interaction.reply(await runners[interaction.commandName](interaction));
    }
});

client.login(TOKEN);
