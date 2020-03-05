import BaseApi from '../BaseApi';

class BetgamesApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/betgames`;
  }

  getUserToken = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/GetUserTokenBetgames`,
  )
}

export default BetgamesApi;