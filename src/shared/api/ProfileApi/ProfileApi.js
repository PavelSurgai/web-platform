import BaseApi from '../BaseApi';
import { ProfileConverter } from './ProfileConverter';

class ProfileApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/user`;
    this.converter = new ProfileConverter();
  }

  getUserInfo = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/profile`,
    null,
    null,
    this.converter.convertUserInfo,
  );

  updateUserInfo = info => this.sendQuery(
    this.queryTypes.PUT,
    `${this.baseUrl}/profile/additional/update`,
    {
      address: info.phone,
      card: info.lastName,
      number_document: info.numberDocument,
      yandex: info.firstName,
    }, null,
    this.converter.convertUpdateInfo,
  );

  changePassword = (password, newPassword) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/password/change`,
    {
      password,
      new_password: newPassword,
    },
  );
}

export default ProfileApi;