import BaseApi from '../BaseApi';

class PromocodeApi extends BaseApi {
  constructor(baseUrl = '') {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/payment/promocode`;
  }

  activatePromocode = promocode => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/activation`,
    { code: promocode },
  );
}
export default PromocodeApi;
