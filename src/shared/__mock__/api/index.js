import { ResultsApi } from './ResultsApi';
import { PaymentApi } from './PaymentApi';

export class MockApi {
  constructor() {
    this.results = new ResultsApi();
    this.payment = new PaymentApi();
  }
}