import { payHistory } from 'shared/__mock__/results';

export class PaymentApi {
  getPayHistory = () => Promise.resolve({ success: true, data: payHistory });
}
