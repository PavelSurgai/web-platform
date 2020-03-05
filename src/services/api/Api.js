import AuthApi from './AuthApi';
import UserApi from './UserApi';
import TotalApi from './TotalApi';
import TransactionApi from './TransactionApi';

class Api {
  constructor(baseUrl = '') {
    this.auth = new AuthApi(baseUrl);
    this.user = new UserApi(baseUrl);
    this.total = new TotalApi(baseUrl);
    this.transaction = new TransactionApi(baseUrl);
  }
}

export default Api;
