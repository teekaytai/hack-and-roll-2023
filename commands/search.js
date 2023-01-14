import { searchWithPriceRange } from '../api.js';
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
        type: 4,
        name: 'minprice',
        description: 'minimum price of item',
        required: false,
        min_value: 0
    },

    {
        type: 4,
        name: 'maxprice',
        description: 'maximum price of item',
        required: false,
        min_value: 0
    }
]

export async function run(interaction) {
    const query = interaction.options.get('name')?.value;
    const count = interaction.options.get('count')?.value ?? 1;
    const minprice = interaction.options.get('minprice')?.value;
    const maxprice = interaction.options.get('maxprice')?.value;
    const fullQuery = `${query}${minprice === undefined ? '' : `, with minprice: ${minprice}`}${maxprice === undefined ? '' : `, with maxprice: ${maxprice}`}`;
    console.log(`search ${fullQuery}, count ${count}`);
    const results = await searchWithPriceRange(query, count, minprice, maxprice);
    let s = "";
    for (let i = 0; i < results.length; ++i) {
        const posted = results[i].aboveFold[0].timestampContent.seconds.low;
        s += '\n' + hyperlink(results[i].title, "https://www.carousell.sg/p/" + results[i].id) + ` (<t:${posted}:R>)`;
    }
    return `Search: ${fullQuery}\n${s ? 'Results' + s : 'No results found'}`;
}
