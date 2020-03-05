import BaseApi from '../BaseApi';
import OutcomeConverter from './OutcomeConverter';

class OutcomeApi extends BaseApi {
  converter = null;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/outcome`;
    this.converter = new OutcomeConverter();
  }

  getGameList = () => {
    return this.sendQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/games/list`,
      null,
      null,
      this.converter.convertGameList,
      f => f,
    );
  }

  loadSession = (lang, gameId) => {
    return this.sendQuery(
      this.queryTypes.POST,
      `${this.baseUrl}/session/create`,
      { game_id: gameId },
      { headers: { 'Content-Type': 'application/json' } },
      this.converter.convertSession,
    );
  }
}

export default OutcomeApi;
