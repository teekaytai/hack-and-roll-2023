import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { REST, Routes, Client, GatewayIntentBits, hyperlink } = require('discord.js');

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
                type: 4,
                name: 'count',
                description: 'Number of results',
                required: false,
                min_value: 1,
                max_value: 5
            }
        ]
    },
    {
        name: 'alert',
        description: 'Sets an alert for a Carousell search',
        options: [
            {
                type: 3,
                name: 'name',
                description: 'Name of the item',
                required: true
            },
            {
                type: 4,
                name: 'count',
                description: 'Number of results',
                required: false,
                min_value: 1,
                max_value: 5
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
        const count = interaction.options.get('count')?.value ?? 1;
        const filters = interaction.options.get('filters')?.value;
        console.log(`search ${query} count ${count}`);
        const results = await search(query, count);
        let s = "";
        for (let i = 0; i < results.length; ++i) {
            s += '\n' + hyperlink(results[i].title, "https://www.carousell.sg/p/" + results[i].id);
        }
        await interaction.reply(`Search: ${query}, with filters: ${filters}\nResults: ${s}`);
    } else if (interaction.commandName === 'alert') {
        const query = interaction.options.get('name')?.value;
        const count = interaction.options.get('count')?.value ?? 1;
        const filters = interaction.options.get('filters')?.value;
        const alert = async function() {
            console.log(`alert ${query}`);
            const results = await search(query, count);
            let s = "";
            for (let i = 0; i < results.length; ++i) {
                s += '\n' + hyperlink(results[i].title, "https://www.carousell.sg/p/" + results[i].id);
            }
            await interaction.channel.send(`Search: ${query}, with filters: ${filters}\nResults: ${s}`);
        }
        await interaction.reply(`Ok got it`);
        setInterval(alert, 5000);
    }
});

client.login(TOKEN);
