import { remouteLanguages } from 'shared/utils/languages/languages';
import BaseApi from '../BaseApi';
import { CybersportConverter } from './CybersportConverter';

class CybersportApi extends BaseApi {
  _timestamp = 0;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.url = baseUrl;
    this.baseUrl = `${baseUrl}/api/bs2/remote/api/line`;
    this.converter = new CybersportConverter();
  }

  loadCybersportGames = lang => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/${lang}/countries/sport300/0`,
    null, null,
    this.converter.gamesConverter,
  );

  loadLineTourneys = (sportID, countryID, lang) => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/${lang}/tournaments/sport${sportID}/country${countryID}/0`,
    null, null,
    data => this.lineConverter.convertorLineTourneys(data, sportID),
  );

  loadUpcomingTourneys = (sportID, countryID, duration, lang) => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/${lang}/tournaments/sport${sportID}/country${countryID}/${duration}`,
    null, null,
    data => this.lineConverter.convertorLineTourneys(data, sportID),
  );

  getFavorites = lang => this.sendQuery(
    this.queryTypes.GET,
    `${this.url}/api/bet/favorites`,
    lang,
    null,
    this.lineConverter.convertFavoritesList,
  );

  async loadEventsByTourney({ sportID, countryID, tourneyID }, lang) {
    return this.sendLineQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/${lang}/events/sport${sportID}/country${countryID}/tourney${tourneyID}/0`,
      null, null,
      data => this.lineConverter.convertorLineEvents(data, countryID),
    );
  }
}

export default CybersportApi;
