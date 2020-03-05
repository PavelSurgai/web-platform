import BaseApi from '../BaseApi';
import { UserApiConverter } from './UserApiConverter';

class UserApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/mini_admin`;
    this.converter = new UserApiConverter();
  }

  createUser = (requestBody) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/create_user`,
    requestBody,
  );

  
  getUsersList = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/user_list`,
    null, null,
    this.converter.convertUsersList,
  );

  changeBanState = (id, value) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/change_attribute`,
    {
      operation: 'change_ban',
      target_id: id,
      is_banned: value,
    }
  )

  changeUserBalance = (id, amount, isOutcome) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/change_attribute`,
    {
      operation: 'change_balance',
      target_id: +id,
      amount: +amount,
      is_outcome: isOutcome,
    }
  )

  resetPassword = id => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/change_attribute`,
    {
      operation: 'change_password',
      target_id: id,
    }, null,
    this.converter.convertNewPassword,
  )
}

export default UserApi