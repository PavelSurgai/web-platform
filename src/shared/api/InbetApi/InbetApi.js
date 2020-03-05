import InbetConverter from './InbetConverter';
import BaseApi from '../BaseApi';

class InbetApi extends BaseApi {
  converter = null;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/inbet`;
    this.inbetConverter = new InbetConverter();
  }

  getGameList = () => {
    return this.sendQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/games/list`,
      null,
      null,
      this.inbetConverter.convertGameList,
    );
  }
  
  loadSession = () => {
    return this.sendQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/session`,
      null,
      null,
      this.inbetConverter.convertSession,
    );
  }
}

export default InbetApi;
