import { NAME as PING_NAME, DESCRIPTION as PING_DESCRIPTION, run as pingRunner } from './commands/ping.js';
import { NAME as SEARCH_NAME, DESCRIPTION as SEARCH_DESCRIPTION, OPTIONS as SEARCH_OPTIONS, run as searchRunner } from './commands/search.js';
import { NAME as ALERT_NAME, DESCRIPTION as ALERT_DESCRIPTION, OPTIONS as ALERT_OPTIONS, run as alertRunner } from './commands/alert.js';
import { NAME as CLEAR_NAME, DESCRIPTION as CLEAR_DESCRIPTION, run as clearRunner } from './commands/clear.js';

export const commands = [
    {
        name: PING_NAME,
        description: PING_DESCRIPTION
    },
    {
        name: SEARCH_NAME,
        description: SEARCH_DESCRIPTION,
        options: SEARCH_OPTIONS
    },
    {
        name: ALERT_NAME,
        description: ALERT_DESCRIPTION,
        options: ALERT_OPTIONS
    },
    {
        name: CLEAR_NAME,
        description: CLEAR_DESCRIPTION
    }
];

export const runners = {
    [PING_NAME]: pingRunner,
    [SEARCH_NAME]: searchRunner,
    [ALERT_NAME]: alertRunner,
    [CLEAR_NAME]: clearRunner,
}
