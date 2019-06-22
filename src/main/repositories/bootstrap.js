import SummonersRepository from './summoners.repository';

export default class RepositoryBootstrap {
  static load(bottle) {

    bottle.factory('SummonersRepository', (container) => {
      return new SummonersRepository({
        ddb: container.DynamoDbService,
        summonersTable: container.SUMMONERS_TABLE
      });
    });

  }
}