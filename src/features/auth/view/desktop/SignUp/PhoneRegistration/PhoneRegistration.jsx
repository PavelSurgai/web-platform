import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from 'components/Input/desktop';
import CheckBox from 'components/CheckBox/desktop';
import Button from 'components/Button/desktop';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import PhoneInput from '../PhoneInput/PhoneInput';
import './PhoneRegistration.scss';

class PhoneRegistration extends React.Component {
  state = {
    phone: '',
    code: '',
    currency: 'RUB',
    password: '',
    repeatPassword: '',
    isAccept: false,
    isOpenAllInputs: false,
  };

  static propTypes = {
    locale: PropTypes.object,
    sendToPhoneCode: PropTypes.func.isRequired,
    signUpPhone: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  onChangeListener = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  onChangePhone = value => this.setState({ phone: value });

  onChangeCurrency = value => this.setState({ currency: value });

  onChangeAccept = value => this.setState({ isAccept: value });

  onChangeOpenedAllInputs = value => this.setState({ isOpenAllInputs: value });

  onSubmit = e => {
    e.preventDefault();
    const { signUpPhone } = this.props;
    const { phone, code, currency, password } = this.state;
    signUpPhone(phone, currency, password, code);
  }

  render() {
    const b = block('phone-registration');
    const { locale, sendToPhoneCode, currencies } = this.props;
    const { phone, code, currency, password, repeatPassword, isAccept, isOpenAllInputs } = this.state;
    const validation = this.checkValidation();
    return (
      <form className={b()}>
        <div className={b('row')}>
          <label className={b('group')}>
            <div className={b('group-title')}>
              {locale.numberPhone}
              <span className={b('require')}>*</span>
            </div>
            <div className={b('input-container')}>
              <PhoneInput
                callBack={this.onChangePhone}
              />
            </div>
          </label>
          <div className={b('group')}>
            {isOpenAllInputs ?
              <React.Fragment>
                <div className={b('group-title')}>
                  {locale.currencyBets}
                </div>
                <div className={b('select-container')}>
                  <CurrencySelector
                    itemsList={currencies}
                    activeValue={currency}
                    callBack={this.onChangeCurrency} />
                </div>
              </React.Fragment> :
              <React.Fragment>
                <div className={b('code-button')}>
                  <Button
                    callBack={() => sendToPhoneCode(phone, () => this.onChangeOpenedAllInputs(true))}
                    text={locale.sendCode}
                    size="low"
                  />
                </div>
                <div className={b('code-button')}>
                  <Button
                    callBack={() => this.onChangeOpenedAllInputs(true)}
                    text={locale.iHaveCode}
                    size="low"
                    color="blue"
                  />
                </div>
              </React.Fragment>
          }
          </div>
        </div>
        {isOpenAllInputs && <React.Fragment>
          <div className={b('row')}>
            <label className={b('group')}>
              <div className={b('group-title')}>
                {locale.inputPassword}
                <span className={b('require')}>*</span>
              </div>
              <div className={b('input-container')}>
                <Input
                  type="password"
                  value={password}
                  name="password"
                  callBack={this.onChangeListener}
                />
              </div>
            </label>
            <label className={b('group')}>
              <div className={b('group-title')}>
                {locale.repeatPassword}
                <span className={b('require')}>*</span>
              </div>
              <div className={b('input-container')}>
                <Input
                  type="password"
                  value={repeatPassword}
                  name="repeatPassword"
                  callBack={this.onChangeListener}
                />
              </div>
            </label>
          </div>
          <div className={b('row')}>
            <label className={b('group')}>
              <div className={b('group-title')}>
                {locale.code}
                <span className={b('require')}>*</span>
              </div>
              <div className={b('input-container')}>
                <Input
                  type="code"
                  value={code}
                  name="code"
                  callBack={this.onChangeListener}
                />
              </div>
            </label>
          </div>
          <label className={b('accept')}>
            <CheckBox checked={isAccept} callBack={e => this.onChangeAccept(e.currentTarget.checked)} name="isAccept" />
            <div className={b('accept-text')}>
              {locale.iAssign}
              <Link to="/flatpages/rules" className={b('link')}>
                {locale.terms}
              </Link>
            </div>
          </label>
          <div className={b('button')}>
            <Button
              type="submit"
              text={locale.registration}
              size="low"
              disabled={!validation}
              callBack={this.onSubmit}
            />
          </div>
        </React.Fragment>}
      </form>
    );
  }

  checkValidation = () => {
    const { phone, currency, password, repeatPassword, isAccept } = this.state;
    if (!phone.length) {
      return false;
    }
    if (password === '') {
      return false;
    }
    if (password !== repeatPassword) {
      return false;
    }
    if (!currency) {
      return false;
    }
    if (!isAccept) {
      return false;
    }
    return true;
  }
}

export default PhoneRegistration;