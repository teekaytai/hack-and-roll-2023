import { getUser } from '../db.js';

export const NAME = 'delete';
export const DESCRIPTION = 'Deletes an alert by its index';
export const OPTIONS = [
  {
      type: 4,
      name: 'index',
      description: 'Index of the alert to delete',
      required: true,
      min_value: 1
  }
];

export async function run(interaction) {
    const index = interaction.options.get('index')?.value;
    const alerts = getUser(interaction.user.id);
    const queries = Object.keys(alerts);
    if (index <= 0 || index > queries.length) {
      return "Index is out of range. Use `list` to view your current alerts."
    }
    const deletedQuery = alerts[queries[index - 1]];
    delete alerts[queries[index - 1]]
    return `Successfully deleted alert for '${deletedQuery}'`;
}
