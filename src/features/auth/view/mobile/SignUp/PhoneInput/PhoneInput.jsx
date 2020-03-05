import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import CountryCodeSelector from './CountryCodeSelector/CountryCodeSelector';
import './PhoneInput.scss';

class PhoneInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryCode: '+7', phone: '',
    };
  }

  static propTypes = {
    callBack: PropTypes.func.isRequired,
    locale: PropTypes.object.isRequired,
    sendToPhoneCode: PropTypes.func.isRequired,
  };

  componentWillUpdate(nextProps, nextState) {
    const { callBack } = this.props;
    const { countryCode, phone } = this.state;
    if (countryCode !== nextState.countryCode || phone !== nextState.phone) {
      callBack(`${nextState.countryCode}${nextState.phone}`);
    }
  }

  onChangeCountryCode = value => {
    this.setState({ countryCode: value });
  }

  onChangePhoneListener = e => e.currentTarget.value.split('').find(temp => (Number(temp) !== 0 && !Number(temp)) || temp === ' ') === undefined &&
    this.setState({ phone: e.currentTarget.value });

  render() {
    const b = block('phone-input');
    const { locale } = this.props;
    const { countryCode, phone } = this.state;
    return (
      <div className={b()}>
        <div className={b('title')}>{locale.numberPhone}</div>
        <div className={b('wrapper')}>
          <div className={b('selector')}>
            <CountryCodeSelector
              itemsList={['+7', '+228', '+322']}
              activeValue={countryCode}
              callBack={this.onChangeCountryCode} />
          </div>
          <input
            className={b('input')}
            value={phone}
            name="phone"
            onChange={this.onChangePhoneListener}
          />
        </div>
      </div>
    );
  }
}

export default PhoneInput;