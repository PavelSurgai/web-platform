import { remouteLanguages } from 'shared/utils/languages/languages';
import BaseApi from '../BaseApi';
import FullEventLineConverter from './FullEventLineConverter';
import FullEventLiveConverter from './FullEventLiveConverter';

class FullEventApi extends BaseApi {
  _timestamp = 0;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/bs2/remote/api`;
    this.lineConverter = new FullEventLineConverter();
    this.liveConverter = new FullEventLiveConverter();
  }

  loadFullEventLine = (eventID, lang) => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/line/${lang}/event/${eventID}`,
    null, null,
    this.lineConverter.convertFullEvent,
  );

  async loadFullEventLive(eventID, lang) {
    const response = await this.actions.get(
      `${this.baseUrl}/live/${lang}/bets/${eventID}`,
    );
    const success = (response.data != null && response.data !== []);
    const convertedEvent = success ? this.liveConverter.convertFullEvent(response.data) : null;
    const resultResponse = {
      success,
      data: convertedEvent,
      errorMessage: success ? null : '',
    };
    this._timestamp = response.data ? response.data.TimeStamp : this._timestamp;
    return resultResponse;
  }

  async updateFullEventLive(eventID, lang, previewEvent = null) {
    const response = await this.actions.get(
      `${this.baseUrl}/live/${lang}/full/${this._timestamp}/${eventID}`,
    );
    const success = response.data != null;
    const convertedEvent = success ? this.liveConverter.convertUpdateFullEvent(response.data, previewEvent) : null;
    const resultResponse = {
      success,
      data: convertedEvent,
      errorMessage: success ? null : '',
    };
    this._timestamp = response.data ? response.data.TimeStamp : this._timestamp;
    return resultResponse;
  }
}

export default FullEventApi;
