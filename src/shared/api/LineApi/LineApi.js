import { remouteLanguages } from 'shared/utils/languages/languages';
import BaseApi from '../BaseApi';
import LineConverter from './LineConverter';

class LineApi extends BaseApi {
  _timestamp = 0;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.url = baseUrl;
    this.baseUrl = `${baseUrl}/api/bs2/remote/api/line`;
    this.lineConverter = new LineConverter();
  }

  loadLineTourneys = (sportID, countryID, lang, filterTime = 0) => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/${lang}/tournaments/sport${sportID}/country${countryID}/${filterTime}`,
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

  async loadEventsByTourney({ sportID, countryID, tourneyID, filterTime = 0 }, lang) {
    return this.sendLineQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/${lang}/events/sport${sportID}/country${countryID}/tourney${tourneyID}/${filterTime}`,
      null, null,
      data => this.lineConverter.convertorLineEvents(data, countryID),
    );
  }

  addFavorit = (eventDate, eventID, eventName, type, lang) => this.sendQuery(
    this.queryTypes.POST,
    `${this.url}/api/bet/favorit/add`,
    { event_date: eventDate,
      event_id: eventID,
      event_name: eventName,
      type },
    null,
    this.lineConverter.convertFavoritesList,
  );

  delFavorite = favoriteId => this.sendQuery(
    this.queryTypes.DELETE,
    `${this.url}/api/bet/favorit/del`,
    {
      id: favoriteId,
    },
    null,
    this.lineConverter.convertFavoritesList,
  );

  loadFullEvent = (eventID, lang) => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.url}/api/bs2/remote/api/line/${lang}/event/${eventID}`,
    null,
    null,
    this.lineConverter.favoritEventConvertor,
  );

  loadTopEvents = lang => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/${lang}/hotevents`,
    null, null,
    this.lineConverter.convertorTop,
  );
}

export default LineApi;
