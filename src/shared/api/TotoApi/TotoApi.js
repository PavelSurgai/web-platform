import BaseApi from '../BaseApi';
import TotoConverter from './TotoConverter';

class TotoApi extends BaseApi {
  converter = null;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/tota`;
    this.converter = new TotoConverter();
  }

  loadToto = () => {
    return this.sendQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/active`,
      null,
      null, this.converter.convertTotoList,
    );
  }

  makeTotoBet = (totoID, bets, amount) => {
    return this.sendQuery(
      this.queryTypes.POST,
      `${this.baseUrl}/ticket`,
      { toto_id: totoID, bets, amount },
      null, this.converter.convertPlaceBetData,
    );
  }

  loadTickets = () => {
    return this.sendQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/ticket`,
      null,
      null, this.converter.convertUserTotoBets,
    );
  }
}

export default TotoApi;
