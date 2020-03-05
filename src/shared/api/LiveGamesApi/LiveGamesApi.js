import { shortLanguages } from 'shared/locale';
import BaseApi from '../BaseApi';

class LiveGamesApi extends BaseApi {
  converter = null;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api`;
    this.ezugiUrl = 'https://play.livetables.io/auth';
  }

  getEzugiToken = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/for_ezugi/get_token`,
  );
  
  getEzugiGame = (token, operatorId, lang, game) => this.sendQuery(
    this.queryTypes.GET,
    `${this.ezugiUrl}/?token=${token}&operatorId=${operatorId}&language=${shortLanguages[lang]}&selectGame=${game}`,
  )
}

export default LiveGamesApi;
