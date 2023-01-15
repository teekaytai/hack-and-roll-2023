![](images/icon.png)

# CAROSTONKS 📈📈📈 

## A Discord bot that allows you to track your wanted items as soon as they go up for sale.

## Installation Guide

To run this bot yourself locally, follow the steps below.

1. Set up a discord bot on the [Discord Developer Portal](https://discord.com/developers/applications). The bot will need permission to use slash commands, read messages and send messages. Take note of the bot's application id and its secret token.

2. Clone the repo

3. Navigate to the repo and run `npm install`

4. Add a `config.json` file to the root of the folder with the following 2 values:
```json
{
  "CLIENT_ID": "Your bot's application id", 
  "TOKEN": "Your bot's secret token",
}
```

5. Run `npm start`

6. You should now be able to communicate with the bot after adding it to a server!

## List of commands

Note: Parameters in square brackets are optional

### Search
`/search query, [count], [minprice], [maxprice]`

Performs a one time search of the requested item within the given price range, returning at most `count` results.

### Alert
`/alert query, [minprice], [maxprice]`

Sets up an alert to notify the user when the requested item(s) within the specified price range is listed for sale.

### List
`/list`

List all alerts the user currently has set up.

### Clear
`/clear`

Clears all alerts the user currently has set up. This does not clear alerts set up by other users.

### Delete
`/delete index`

Deletes the alert represented by the specified index in the list.
