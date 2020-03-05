import BaseApi from '../BaseApi';
import LiveConverter from './LiveConverter';

class LiveApi extends BaseApi {
  _timestamp = 0;

  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/bs2/remote/api/live`;
    this.convertorLive = new LiveConverter();
  }

  loadLive = lang => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/${lang}/full/0/0`,
    null, null,
    data => {
      this._timestamp = data.TimeStamp;
      return this.convertorLive.convertorLive(data);
    },
  );

  updateLive = (lang, getCurrentEvents) => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/${lang}/full/${this._timestamp}/0`,
    null, null,
    data => {
      if (data.TimeStamp > this._timestamp) this._timestamp = data.TimeStamp;
      else return getCurrentEvents();
      return this.convertorLive.updateAndConvertLiveEvents(data.LEvents, getCurrentEvents());
    },
  );

  updateMultiLive = (lang, getCurrentEvents, getCurrentMulti) => this.sendLineQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/${lang}/full/${this._timestamp}/0`,
    null, null,
    data => {
      if (data.TimeStamp > this._timestamp) this._timestamp = data.TimeStamp;
      else return ({ sports: getCurrentEvents(), multiEvents: getCurrentMulti() });
      return this.convertorLive.updateAndConvertMultiLiveEvents(data, getCurrentEvents(), getCurrentMulti());
    },
  );
}

export default LiveApi;
