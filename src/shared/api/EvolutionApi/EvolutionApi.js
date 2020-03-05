import BaseApi from '../BaseApi';

class EvolutionApi extends BaseApi {
  converter = null;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl === '' ? 'https://pitch90bet.com' : baseUrl}/evolution`;
  }

  getGameList = () => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/gamelist`,
    null,
    null,
  );

  runGame = data => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/run`,
    data,
    null,
  );
}

export default EvolutionApi;
