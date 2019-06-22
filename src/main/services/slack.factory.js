export default class SlackFactory {
  constructor(options) {
    if (!options) {
      options = {};
    }

    this.slackService = options.slackService || {};
  }

  send(text) {
    return this.slackService.send({text});
  }
}