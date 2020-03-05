import BaseApi from '../BaseApi';
import { FlatPagesConverter } from './FlatPagesConverter';

class FlatPagesApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/site/flatpages`;
    this.converter = new FlatPagesConverter();
  }

  getFlatPages = lang => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/list/${lang}`,
    null,
    null,
    this.converter.convertFlatPages,
  );
}

export default FlatPagesApi;