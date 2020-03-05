import BaseApi from '../BaseApi';
import { MediaApiConverter } from './MediaApiConverter';
class MediaApi extends BaseApi {
  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/site`;
    this.converter = new MediaApiConverter();
  }

  loadAdvertising = lang => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/ads`,
    lang,
  );

  loadSlider = lang => {
    return this.sendQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/slides`,
      lang, null,
      this.converter.convertSliders,
    );
  }
}

export default MediaApi;
