# Reague

A side project of mine that allows a user to type in `/Reague?` into a Slack workspace, capture information from the Riot API, and come back with information on whether that individual is currently in game or not.

## How does it work?

- Type in `/Reague?` into Slack
- Slack POSTs to an API gateway endpoint
- The endpoint will trigger a lambda
  - Responds back to Slack immediately with a 200 response, otherwise Slack will timeout any *Slash Command* in 3 seconds
  - Invoke another lambda (yes, lambda invokes another lambda)
    - Retrieves data from DynamoDB (names from my friendlist)
    - Retrieves game data from [Riot Games API](https://developer.riotgames.com/)
    - Using a Slack Incoming Webhook, the lambda will send a message to a specific Slack channel with details on whether my group of friends is currently in a game or not

## Getting Started (Untested)

- Clone this repository
- `npm install`
- Fill in the values in `environments/dev.yml`
- `sls deploy`

## Built With

* [Serverless Framework](https://serverless.com/) - The Framework used to build my components

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
