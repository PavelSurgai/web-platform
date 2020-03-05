import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import CheckBox from 'components/CheckBox/desktop';
import Button from 'components/Button/desktop';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import './OneClickRegistration.scss';

class OneClickRegistration extends React.Component {
  state = {
    isAccept: true,
    currency: 'RUB',
  };

  static propTypes = {
    locale: PropTypes.object,
    signUpOneClick: PropTypes.func.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  onChangeAccept = value => this.setState({ isAccept: value });

  onSignUpClick = () => {
    const { signUpOneClick } = this.props;
    const { currency } = this.state;
    signUpOneClick(currency);
  }

  onChangeCurrency = value => this.setState({ currency: value });

  render() {
    const b = block('one-click-registration');
    const { locale, currencies } = this.props;
    const { isAccept, currency } = this.state;

    return (
      <div className={b()}>
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
            callBack={this.onSignUpClick}
            text={locale.registration}
            size="low"
            disabled={!isAccept}
          />
        </div>
      </div>
    );
  }
}

export default OneClickRegistration;