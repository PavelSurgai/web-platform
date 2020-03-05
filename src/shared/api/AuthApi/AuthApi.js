import BaseApi from '../BaseApi';
import { AuthConverter } from './AuthConverter';

class AuthApi extends BaseApi {
  constructor(baseUrl) {
    super(baseUrl);
    this.baseUrl = `${baseUrl}/api/user`;
    this.converter = new AuthConverter();
  }

  signInByEmail = (email, password) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/login/email`,
    { email, password },
  );

  verifyEmail = code => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/email/verify/${code}`,
  );

  signInByPhone = (phone, password) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/login/phone`,
    { phone, password },
  );

  loginUniversal = (login, password) => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/login`,
    { login: login,
     password: password },
  );

  signUp = info => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/signup`,
    { ...info, name: '' },
  )

  signUpPhone = info => this.sendQuery(
    this.queryTypes.POST,
    `${this.baseUrl}/signup/phone`,
    { ...info, name: '' },
  )

  checkAuth = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/check`,
    null, null,
    this.converter.convertUserData,
  )

  getBalance = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/balance`,
    null, null,
    this.converter.convertBalance,
  )

  logOut = () => this.sendQuery(
    this.queryTypes.GET,
    `${this.baseUrl}/logout`,
  )

  sendToPhoneCode = phone => {
    return this.sendQuery(
      this.queryTypes.POST,
      `${this.baseUrl}/phone/code`,
      { phone },
      { headers: { 'Content-Type': 'application/json' } },
    );
  }

  sendEmail = login => {
    return this.sendQuery(
      this.queryTypes.POST,
      `${this.baseUrl}/password/restore`,
      { email: login },
    );
  }

  getPhoneCode = login => {
    return this.sendQuery(
      this.queryTypes.POST,
      `${this.baseUrl}/password/restore/phone`,
      { phone: login },
    );
  }

  changePassword = (pass, code) => {
    return this.sendQuery(
      this.queryTypes.POST,
      `${this.baseUrl}/password/restore/new`,
      { code: code,
        new_password: pass },
    );
  }
  
  changePasswordByPhone = (login, pass, phoneCode) => {
    return this.sendQuery(
      this.queryTypes.POST,
      `${this.baseUrl}/password/restore/phone/new`,
      { phone: login,
        new_password: pass,
        code: phoneCode },
    );
  }
}

export default AuthApi;