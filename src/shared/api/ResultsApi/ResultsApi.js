import dayjs from 'dayjs';

import BaseApi from '../BaseApi';
import { ResultsConverter } from './ResultsConverter';

class ResultsApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/bs2/remote/api/results`;
    this.converter = new ResultsConverter();
  }

  getSports = (info, lang) => {
    const convertedBeginDate = dayjs(info.beginDate).format('DDMMYYYY');
    const convertedEndDate = dayjs(info.endDate).format('DDMMYYYY');
    return this.sendLineQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/${lang}/sports/0/${convertedBeginDate}/${convertedEndDate}`,
      null, null,
      this.converter.convertSports,
    );
  }

  getTournaments = (info, lang) => {
    const convertedBeginDate = dayjs(info.beginDate).format('DDMMYYYY');
    const convertedEndDate = dayjs(info.endDate).format('DDMMYYYY');
    return this.sendLineQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/${lang}/tournaments/sport${info.sportID}/0/${convertedBeginDate}/${convertedEndDate}`,
      null, null,
      this.converter.convertTournaments,
    );
  }

  getResults = (info, lang) => {
    const convertedBeginDate = dayjs(info.beginDate).format('DDMMYYYY');
    const convertedEndDate = dayjs(info.endDate).format('DDMMYYYY');
    return this.sendLineQuery(
      this.queryTypes.GET,
      `${this.baseUrl}/${lang}/sport${info.sportID}/${info.country}/${info.tournament}/0/${convertedBeginDate}/${convertedEndDate}`,
      null, null,
      this.converter.convertResults,
    );
  }
}

export default ResultsApi;