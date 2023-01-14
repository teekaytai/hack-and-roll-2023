import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');

const config = require('./config.json');

const TOKEN = config.TOKEN;
const CLIENT_ID = config.CLIENT_ID;

import { search } from './api.js';

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: 'search',
        description: 'Searches Carousell for item',
        options: [
            {
                type: 3,
                name: 'name',
                description: 'Name of the item',
                required: true
            },
            {
                type: 3,
                name: 'filters',
                description: 'Filters?',
                required: false
            }
        ]
    }
];

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

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (interaction.commandName === 'search') {
        const query = interaction.options.get('name')?.value;
        const filters = interaction.options.get('filters')?.value;
        console.log(`search ${query}`);
        const results = await search(query);
        console.log(results);
        await interaction.reply(`Search: ${query}, with filters: ${filters}\nTop result: ${results[0]}`);
    }
});

client.login(TOKEN);
