import BaseApi from '../BaseApi';
import { TotalConverter } from './TotalConverter';

class TotlApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/mini_admin`;
    this.converter = new TotalConverter();
  }

  getTotal = (fromDate, toDate) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/total`,
    { from_date: fromDate,
      to_date: toDate,
    },
    null,
    this.converter.totalConverter,
  );
}

export default TotlApi
