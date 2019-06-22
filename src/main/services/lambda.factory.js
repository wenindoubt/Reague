export default class LambdaFactory {
  constructor(options) {
    if (!options) {
      options = {};
    }

    this.lambdaService = options.lambdaService || {};
    this.lambdaName = options.lambdaName || '';
  }

  triggerNoLoad() {
    const params = {
      FunctionName: this.lambdaName,
      InvocationType: 'Event',
      Payload: '{}'
    };
    return this.lambdaService.invoke(params).promise();
  }
}