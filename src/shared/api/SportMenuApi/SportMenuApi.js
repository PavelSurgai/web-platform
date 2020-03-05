import BaseApi from '../BaseApi';
import { SportMenuConverter } from './SportMenuConverter';

class SportMenuApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/bs2/remote/api`;
    this.converter = new SportMenuConverter();
  }

  getSports = shortLang => {
    return this.sendLineQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/line/${shortLang}/sports/0`,
      null, null,
      this.converter.convertSports,
    );
  }

  getCountries = (id, shortLang, time = 0) => {
    return this.sendLineQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/line/${shortLang}/countries/sport${id}/full/${time}`,
      null, null,
      this.converter.convertCountries,
    );
  }
}

export default SportMenuApi;
