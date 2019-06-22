export default class AxiosFactory {
  constructor(options) {
    if (!options) {
      options = {};
    }

    this.riotApiKey = options.riotApiKey || '';
    this.riotApiUrl = options.riotApiUrl || '';
    this.axiosService = options.axiosService || {};
  }

  promiseGet(apiCall) {
    const instance = this.axiosService.create({
      baseURL: this.riotApiUrl,
      timeout: 5000,
      headers: {
        "X-Riot-Token": this.riotApiKey
      }
    });
    return instance.get(apiCall)
  }
}