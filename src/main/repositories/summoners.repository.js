export default class SummonersRepository {
  constructor(options) {
    if (!options) {
      options = {};
    }
    this.ddb = options.ddb || {};
    this.summonersTable = options.summonersTable || {};
  }

  getSummoners() {
    const params = {
      TableName: this.summonersTable
    };
    return this.ddb.scan(params).promise()
      .then(response => response.Items);
  };
}