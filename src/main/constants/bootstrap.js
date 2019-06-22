import axios from 'axios';

export default class ConstantBootstrap {
  static load(bottle) {

    bottle.constant('RIOT_API_KEY', process.env.RIOT_API_KEY);
    bottle.constant('RIOT_API_URL', process.env.RIOT_API_URL);
    bottle.constant('SUMMONERS_TABLE', process.env.SUMMONERS_TABLE);
    bottle.constant('SLACK_WEBHOOK', process.env.SLACK_WEBHOOK);
    bottle.constant('AXIOS', axios);
    bottle.constant('REAGUE_LAMBDA_NAME', process.env.REAGUE_LAMBDA_NAME);

  }
}