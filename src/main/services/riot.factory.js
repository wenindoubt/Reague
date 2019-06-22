export default class RiotFactory {
  constructor(options) {
    if (!options) {
      options = {};
    }
    this.riotApiKey = options.riotApiKey || '';
    this.riotApiUrl = options.riotApiUrl || '';
    this.riotApiHeaders = options.riotApiHeaders || {};
    this.summonersRepository = options.summonersRepository || {};
    this.slackFactory = options.slackFactory || {};
    this.axiosFactory = options.axiosFactory || {};
    this.lambdaFactory = options.lambdaFactory || {};
  }

  async fetchRiotData(apiCall) {
    //const response = await this.axiosFactory.promiseGet(`${this.riotApiUrl}${apiCall}, ${this.riotApiHeaders}`);
    const response = await this.axiosFactory.promiseGet(apiCall);
    return response.data;
  }

  async getSummonerBySummonerName(summonerName) {
    return await this.fetchRiotData(`/summoner/v4/summoners/by-name/${summonerName}`);
  }

  async getSummonerBySummonerId(encryptedSummonerId) {
    return await this.fetchRiotData(`/summoner/v4/summoners/${encryptedSummonerId}`);
  }

  async getSummonerNames() {
    return await this.summonersRepository.getSummoners();
  }

  async getCurrentGameInfoBySummonerId(encryptedSummonerId) {
    return await this.fetchRiotData(`/spectator/v4/active-games/by-summoner/${encryptedSummonerId}`)
  }

  getGameMode(gameMode) {
    switch (gameMode) {
      case 'CLASSIC':
        return 'Summoner\'s Rift';
      case 'ARAM':
        return 'ARAM';
    }
  }

  async sendSlackMessage(text) {
    return await this.slackFactory.send(text);
  }

  theMessenger() {
    return this.lambdaFactory.triggerNoLoad(process.env.REAGUE_LAMBDA_NAME)
      .then(() => {
        return ({statusCode: 200});
      });
  }

  async reague() {
    // get summoner names from DDB
    const allSummonerNames = await this.getSummonerNames();

    // get all summoner objects
    let summonerObject = [];
    for (const item of allSummonerNames) {
      summonerObject = [ ...summonerObject, await this.getSummonerBySummonerName(item.name)];
    }

    // parse the encrypted summoner object just for the summoner id
    let encryptedSummonerId = [];
    for (const obj of summonerObject) {
      encryptedSummonerId = [ ...encryptedSummonerId, obj.id]
    }

    // check whether a summoner is in game and send a slack message
    for (const id of encryptedSummonerId) {
      try {
        const game = await this.getCurrentGameInfoBySummonerId(id);
        const gameLength = Math.floor(game.gameLength / 60 + 3);
        const gameMode = this.getGameMode(game.gameMode);
        const name = (await this.getSummonerBySummonerId(id)).name;
        await this.sendSlackMessage(`:awyeah: *${name}* has been playing for ${gameLength} minutes (${gameMode})`);
      }
      catch (error) {
        const name = (await this.getSummonerBySummonerId(id)).name
        await this.sendSlackMessage(`:are_you_kidding_me: *${name}* is currently not in a game`);
      }
    }
    return ({ statusCode: 200 });
  }

}