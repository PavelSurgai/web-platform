import BaseApi from '../BaseApi';
import BasketConverter from './BasketConverter';

class BasketApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseRemoteUrl = `${baseUrl}/api/remote`;
    this.baseLocalUrl = `${baseUrl}/api/bet`;
    this.converter = new BasketConverter();
  }

  addToBetslip = bet => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseRemoteUrl}/AddToBetslip`,
    bet.betslipInfo,
    null,
    this.converter.convertAddToBetslipData,
    this.converter.convertAddToBetslipDataFail,
  );

  getLimits = () => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseRemoteUrl}/GetLimitations`,
    {}, {},
    this.converter.convertLimit,
  );

  removeFromBetslip = bet => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseRemoteUrl}/RemoveFromBetslip`,
    bet.betslipInfo,
  );

  clearBetslip = () => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseRemoteUrl}/ClearBetslip`,
  );

  makeBet = (data, lang) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseLocalUrl}/place`,
    { data, need_calc: true },
    null,
    this.converter.convertPlaceBetData,
  );

  loadUserBetslip = () => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseRemoteUrl}/getBetslip`,
    null,
    { headers: { 'Content-Type': 'application/json' } },
    data => this.converter.convertRemoteBasket(data.d),
  );

  changeBetslipType = type => this.sendLineQuery(
    this.queryTypes.POST,
    `${this.baseRemoteUrl}/ChangeBetslipType`,
    { betslipType: type.ID },
  );
}

export default BasketApi;