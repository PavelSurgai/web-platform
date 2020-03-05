import BaseApi from '../BaseApi';
import { PaymentConverter } from './PaymentConverter';

class PaymentApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/payment`;
    this.converter = new PaymentConverter();
  }

  initFreeKassa = (mod, amount) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/freekassa/init`,
    {
      amount,
      payment_mode: mod,
    },
  );

  initInterkassa = ({ amount, paymentMode }) => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/interkassa/init?&amount=${amount}&ik_pw_via=${paymentMode.via}&payment_mode=${paymentMode.pm}`,
  );
  
  // проверка делал ли пользователь 3 и более пополнений на сайт для включения карт interkassa
  getAccessToInterkassaTopUp = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/check_transactions`,
  );
  
  withdrawal = info => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/withdrawal`,
    {
      requisites: info.requisites,
      value: info.amount,
      payment_mode: info.type,
    },
  );

  getPayHistory = timePeriod => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/history/payment-with-withdrawal?begin=${timePeriod.begin}&end=${timePeriod.end}`,
    null, null,
    this.converter.convertPayHistory,
  );
}

export default PaymentApi;