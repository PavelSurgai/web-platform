import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from 'components/Input/desktop';
import CheckBox from 'components/CheckBox/desktop';
import Button from 'components/Button/desktop';
import Spinner from 'components/Spinner';
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
    handleAuthModal: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(String).isRequired,
    actionProcessing: PropTypes.bool.isRequired,
  }

  onChangeListener = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  onChangeCurrency = value => this.setState({ currency: value });

  onChangeAccept = value => this.setState({ isAccept: value });

  onSubmit = e => {
    e.preventDefault();
    const { email, currency, password } = this.state;
    const { handleAuthModal } = this.props;
    this.props.signUpByEmail({ email, currency, password }, () => handleAuthModal(false));
  }
  
  render() {
    const b = block('email-registration');
    const { locale, currencies, actionProcessing } = this.props;
    const { email, currency, password, repeatPassword, isAccept } = this.state;
    const validation = this.checkValidation();
    return (
      <React.Fragment>
        { actionProcessing && <Spinner isLoading={actionProcessing} /> }
        <form className={b()} onSubmit={this.onSubmit}>
          <div className={b('row')}>
            <label className={b('group')}>
              <div className={b('group-title')}>
                {locale.email}
                <span className={b('require')}>*</span>
              </div>
              <div className={b('input-container')}>
                <Input
                  value={email}
                  name="email"
                  callBack={this.onChangeListener}
                />
              </div>
            </label> 
            <div className={b('group')}>
              <div className={b('group-title')}>
                {locale.currencyBets}
              </div>
              <div className={b('select-container')}>
                <CurrencySelector
                  itemsList={currencies}
                  activeValue={currency}
                  callBack={this.onChangeCurrency} />
              </div>
            </div>
          </div>
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
              disabled={!validation}
              type="submit"
            />
          </div>
        </form>
      </React.Fragment>
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
