import { search } from '../api.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { hyperlink } = require('discord.js');

export const NAME = 'search';
export const DESCRIPTION = 'Searches Carousell for item';
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
    },
    {
        type: 3,
        name: 'filters',
        description: 'Filters?',
        required: false
    }
]

export async function run(interaction) {
    const query = interaction.options.get('name')?.value;
    const count = interaction.options.get('count')?.value ?? 1;
    const filters = interaction.options.get('filters')?.value;
    console.log(`search ${query} count ${count}`);
    const results = await search(query, count);
    const now = Math.round(Date.now() / 1000);
    let s = "";
    for (let i = 0; i < results.length; ++i) {
        const posted = results[i].aboveFold[0].timestampContent.seconds.low;
        s += '\n' + hyperlink(results[i].title, "https://www.carousell.sg/p/" + results[i].id) + ` (<t:${posted}:R>)`;
    }
    return `Search: ${query}, with filters: ${filters}\nResults: ${s}`;
}
