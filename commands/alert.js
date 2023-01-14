import { searchWithPriceRange } from '../api.js';
import { getUser } from '../db.js';

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
    const user = interaction.user;
    const query = interaction.options.get('name')?.value;
    const minprice = interaction.options.get('minprice')?.value;
    const maxprice = interaction.options.get('maxprice')?.value;
    const fullQuery = `${query}${minprice === undefined ? '' : `, with minprice: ${minprice}`}${maxprice === undefined ? '' : `, with maxprice: ${maxprice}`}`;
    if (fullQuery in getUser(user.id)) {
        return `You already set an alert for ${fullQuery}`;
    }

    let lastResultTime = Date.now();
    const alert = async function () {
        console.log(`alert ${fullQuery}`);
        const results = await searchWithPriceRange(query, 40, minprice, maxprice);
        let latestResultTime = 0;
        const newResults = [];
        for (let i = 0; i < results.length; ++i) {
            if (newResults.length === 5) {
                const resultsString = newResults.map(result => `https://www.carousell.sg/p/${result.id} - ${result.title} (<t:${result.aboveFold[0].timestampContent.seconds.low}:R>)`).join('\n');
                await interaction.channel.send(`${user}\nSearch: ${fullQuery}\nResults:\n${resultsString}`);
                newResults = [];
            }
            const timePosted = results[i].aboveFold[0].timestampContent.seconds.low * 1000;
            if (timePosted > lastResultTime) {
                newResults.push(results[i])
                latestResultTime = Math.max(latestResultTime, timePosted)
            }
        }
        const resultsString = newResults.map(result => `https://www.carousell.sg/p/${result.id} - ${result.title} (<t:${result.aboveFold[0].timestampContent.seconds.low}:R>)`).join('\n');
        if (newResults.length > 0) {
            await interaction.channel.send(`${user}\nSearch: ${fullQuery}\nResults:\n${resultsString}`);
        } else {
            console.log(`No new results for ${query}`);
        }
        lastResultTime = Math.max(lastResultTime, latestResultTime);
    }
    getUser(user.id)[fullQuery] = setInterval(alert, 5000);
    return `Alert set for '${fullQuery}'`;
}