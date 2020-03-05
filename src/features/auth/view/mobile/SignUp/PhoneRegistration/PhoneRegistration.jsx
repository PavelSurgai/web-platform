import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from 'components/Input/mobile';
import CheckBox from 'components/CheckBox/mobile';
import Button from 'components/Button/mobile';
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
    inputsOpen: false,
  };

  static propTypes = {
    locale: PropTypes.object,
    sendToPhoneCode: PropTypes.func.isRequired,
    signUpPhone: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    callback: PropTypes.object,
    codeWasSended: PropTypes.bool.isRequired,
  }

  onChangeListener = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  onChangePhone = value => this.setState({ phone: value });

  onChangeCurrency = value => this.setState({ currency: value });

  onChangeAccept = value => this.setState({ isAccept: value });

  onSubmit = e => {
    e.preventDefault();
    const { signUpPhone, callback } = this.props;
    const { phone, code, currency, password } = this.state;
    signUpPhone(phone, currency, password, code, callback);
  }

  render() {
    const b = block('phone-registration');
    const { locale, sendToPhoneCode, currencies } = this.props;
    const { phone, code, currency, password, repeatPassword, isAccept, inputsOpen } = this.state;
    const validation = this.checkValidation();
    return (
      <form className={b()}>
        <div className={b('top-block')}>
          <label className={b('group')}>
            <div className={b('input-container')}>
              <PhoneInput
                callBack={this.onChangePhone}
                locale={locale}
                sendToPhoneCode={() => sendToPhoneCode(phone)}
              />
            </div>
          </label>
          {!inputsOpen ? <div className={b('buttons-wrapper')}>
            <div className={b('button')}>
              <Button
                text={locale.sendCode}
                size="low"
                callBack={() => sendToPhoneCode(phone, this.changeOpenedInputs)}
              />
            </div>
            <div className={b('button')}>
              <Button
                text={locale.iHaveCode}
                size="low"
                callBack={this.changeOpenedInputs}
              />
            </div>
          </div> :
            <React.Fragment>
              <label className={b('group')}>
                <div className={b('title')}>{locale.inputPassword}</div>
                <div className={b('input-container')}>
                  <Input
                    type="password"
                    placeholder={locale.inputPassword}
                    value={password}
                    name="password"
                    callBack={this.onChangeListener}
                  />
                </div>
              </label>
              <label className={b('group')}>
                <div className={b('title')}>{locale.repeatPassword}</div>
                <div className={b('input-container')}>
                  <Input
                    type="password"
                    placeholder={locale.repeatPassword}
                    value={repeatPassword}
                    name="repeatPassword"
                    callBack={this.onChangeListener}
                  />
                </div>
              </label>
              <label className={b('group')}>
                <div className={b('title')}>{locale.code}</div>
                <div className={b('input-container')}>
                  <Input
                    type="code"
                    placeholder={locale.code}
                    value={code}
                    name="code"
                    callBack={this.onChangeListener}
                  />
                </div>
              </label>
            </React.Fragment>}

        </div>
        <div className={b('bottom-block')}>
          <div className={b('select-container')}>
            <CurrencySelector
              itemsList={currencies}
              activeValue={currency}
              callBack={this.onChangeCurrency} />
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
        </div>
      </form>
    );
  }

  changeOpenedInputs = () => {
    this.setState({ inputsOpen: true });
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
