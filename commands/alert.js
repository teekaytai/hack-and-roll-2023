import { search } from '../api.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { hyperlink } = require('discord.js');

export const NAME = 'alert';
export const DESCRIPTION = 'Sets an alert for a Carousell search';
export const OPTIONS = [
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

export async function run(interaction) {
    const query = interaction.options.get('name')?.value;
    const count = interaction.options.get('count')?.value ?? 1;
    const filters = interaction.options.get('filters')?.value;
    const alert = async function () {
        console.log(`alert ${query}`);
        const results = await search(query, count);
        let s = "";
        for (let i = 0; i < results.length; ++i) {
            s += '\n' + hyperlink(results[i].title, "https://www.carousell.sg/p/" + results[i].id);
        }
        interaction.channel.send(`Search: ${query}, with filters: ${filters}\nResults: ${s}`);
    }
    setInterval(alert, 5000);
    return 'Ok got it';
}