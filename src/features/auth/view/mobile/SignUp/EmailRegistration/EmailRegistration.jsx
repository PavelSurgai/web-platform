import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from 'components/Input/mobile';
import CheckBox from 'components/CheckBox/mobile';
import Button from 'components/Button/mobile';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import './EmailRegistration.scss';

class EmailRegistration extends React.Component {
  state = {
    email: '',
    currency: 'RUB',
    password: '',
    repeatPassword: '',
    isAccept: false,
  };

  static propTypes = {
    locale: PropTypes.object,
    signUpByEmail: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(String).isRequired,
    callback: PropTypes.func.isRequired,
  }

  onChangeListener = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  onChangeCurrency = value => this.setState({ currency: value });

  onChangeAccept = value => this.setState({ isAccept: value });

  onSubmit = e => {
    e.preventDefault();
    const { email, currency, password } = this.state;
    const { signUpByEmail, callback } = this.props;
    signUpByEmail({ email, currency, password }, callback);
  }

  render() {
    const b = block('email-registration');
    const { locale, currencies } = this.props;
    const { email, currency, password, repeatPassword, isAccept } = this.state;
    const validation = this.checkValidation();
    return (
      <form className={b()} onSubmit={this.onSubmit}>
          <label className={b('group')}>
            <div className={b('input-container')}>
              <Input
                placeholder={locale.email}
                value={email}
                name="email"
                callBack={this.onChangeListener}
              />
            </div>
          </label> 
          <div className={b('group')}>
            <div className={b('select-container')}>
              <CurrencySelector
                itemsList={currencies}
                activeValue={currency}
                callBack={this.onChangeCurrency} />
            </div>
          </div>
          <label className={b('group')}>
            <div className={b('input-container')}>
              <Input
                placeholder={locale.inputPassword}
                type="password"
                value={password}
                name="password"
                callBack={this.onChangeListener}
              />
            </div>
          </label>
          <label className={b('group')}>
            <div className={b('input-container')}>
              <Input
                placeholder={locale.repeatPassword}
                type="password"
                value={repeatPassword}
                name="repeatPassword"
                callBack={this.onChangeListener}
              />
            </div>
          </label>
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
            text={locale.registration}
            size="low"
            color="green"
            disabled={!validation}
            type="submit"
          />
        </div>
      </form>
    );
  }

  checkValidation = () => {
    const { email, currency, password, repeatPassword, isAccept } = this.state;
    if (email.split('').findIndex(temp => temp === '@') === -1 || email.split('').findIndex(temp => temp === '.') === -1) {
      return false;
    }
    if (password === '') {
      return false;
    }
    if (repeatPassword !== password) {
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

export default EmailRegistration;
