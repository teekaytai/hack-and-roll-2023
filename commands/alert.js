import { search } from '../api.js';
import { getUser } from '../db.js';

export const NAME = 'alert';
export const DESCRIPTION = 'Sets an alert for a Carousell search';
export const OPTIONS = [
    {
        type: 3,
        name: 'name',
        description: 'Name of the item',
        required: true
    }
]

export async function run(interaction) {
    const user = interaction.user;
    const query = interaction.options.get('name')?.value;
    if (query in getUser(user.id)) {
        return `You already set an alert for ${query}`;
    }

    let lastResultTime = 0;
    const alert = async function () {
        console.log(`alert ${query}`);
        const results = await search(query, 40);
        let latestResultTime = Date.now();
        const newResults = [];
        for (let i = 0; i < results.length; ++i) {
            if (newResults.length == 5) {
                break;
            }
            const timePosted = results[i].aboveFold[0].timestampContent.seconds.low;
            if (timePosted > lastResultTime) {
                newResults.push(results[i])
                latestResultTime = Math.max(latestResultTime, timePosted)
            }
        }
        lastResultTime = Math.max(lastResultTime, latestResultTime);
        const resultsString = newResults.map(result => `https://www.carousell.sg/p/${result.id} - ${result.title} (<t:${result.aboveFold[0].timestampContent.seconds.low}:R>)`).join('\n');
        if (newResults.length > 0) {
            interaction.channel.send(`${user}\nSearch: ${query}\nResults:\n${resultsString}`);
        } else {
            console.log(`No new results for ${query}`);
        }
    }
    getUser(user.id)[query] = setInterval(alert, 5000);
    return `Alert set for '${query}'`;
}