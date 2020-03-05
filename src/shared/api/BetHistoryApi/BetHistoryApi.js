import BaseApi from '../BaseApi';
import { BetHistoryConverter } from './BetHistoryConverter';

class BetHistoryApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api`;
    this.converter = new BetHistoryConverter();
  }

  getBetHistory = info => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/remote/GetUserBets`,
    info, null,
    this.converter.convertBetHistory,
  );

  getBetContent = id => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/remote/GetBetContent`,
    { id }, null,
    this.converter.convertBetContent,
  );

  getUserCashoutBets = lang => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/remote/GetUserCashoutBets`,
    { culture: lang },
    null,
    this.converter.convertCashoutBets,
  );

  sellBet = (betID, betcode) => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/bet/sell`,
    { betID, betcode }, null,
  );
}

export default BetHistoryApi;