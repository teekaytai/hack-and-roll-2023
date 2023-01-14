import { getUser, setUser } from '../db.js';

export const NAME = 'clear';
export const DESCRIPTION = 'Removes all your searches';

export async function run(interaction) {
    const searches = getUser(interaction.user.id);
    let count = 0;
    for (let term in searches) {
        clearInterval(searches[term]);
        ++count;
    }
    setUser(interaction.user.id, {});
    return `${count} alerts removed!`;
}
