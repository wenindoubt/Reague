import AWS from 'aws-sdk';
import { IncomingWebhook } from '@slack/webhook';
import RiotFactory from './riot.factory';
import SlackFactory from './slack.factory';
import LambdaFactory from './lambda.factory';
import AxiosFactory from './axios.factory';

export default class ServiceBootstrap {
  static load(bottle) {

    bottle.service('DynamoDbService', AWS.DynamoDB.DocumentClient);

    bottle.service('LambdaService', AWS.Lambda);

    bottle.service('SlackService', IncomingWebhook, 'SLACK_WEBHOOK');

    bottle.factory('AxiosFactory', (container) => {
      return new AxiosFactory({
        axiosService: container.AXIOS,
        riotApiUrl: container.RIOT_API_URL,
        riotApiKey: container.RIOT_API_KEY
      });
    });

    bottle.factory('SlackFactory', (container) => {
      return new SlackFactory({
        slackService: container.SlackService,
      });
    });

    bottle.factory('LambdaFactory', (container) => {
      return new LambdaFactory({
        lambdaService: container.LambdaService,
        lambdaName: container.REAGUE_LAMBDA_NAME
      });
    });

    bottle.factory('RiotFactory', (container) => {
      return new RiotFactory({
        riotApiKey: container.RIOT_API_KEY,
        riotApiUrl: container.RIOT_API_URL,
        riotApiHeaders: container.RIOT_API_HEADERS,
        summonersRepository: container.SummonersRepository,
        slackFactory: container.SlackFactory,
        axiosFactory: container.AxiosFactory,
        lambdaFactory: container.LambdaFactory
      });
    });

  }
}