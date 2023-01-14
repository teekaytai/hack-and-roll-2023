import { getUser } from '../db.js';

export const NAME = 'list';
export const DESCRIPTION = 'Lists all your current alerts';

export async function run(interaction) {
    const queries = Object.keys(getUser(interaction.user.id));
    if (queries.length === 0) {
        return "You have no alerts. Create an alert using `/alert`"
    }
    return queries.map((query, i) => `${i + 1}. ${query}`).join('\n');
}
