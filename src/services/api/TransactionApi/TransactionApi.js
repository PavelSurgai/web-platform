import BaseApi from '../BaseApi';
import { TransactionApiConverter } from './TransactionApiConverter';

class TransactionApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/mini_admin`;
    this.converter = new TransactionApiConverter();
  }

  createUser = (userName, password) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/create_user`,
    { email: userName,
      password,
      name: '',
      currency: 'TND',
    },
  );

  
  getTransactions = period => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/transfers`,
    {
      from_date: period.startDate,
      to_date: period.endDate,
    }, null,
    this.converter.convertTransfers,
  );
}

export default TransactionApi;
