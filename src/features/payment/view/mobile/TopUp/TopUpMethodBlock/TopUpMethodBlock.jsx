import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Input from 'components/Input/mobile';
import Button from 'components/Button/mobile';

import './TopUpMethodBlock.scss';

const TopUpMethodBlock = ({ method, onTopUpClick, locale, changeMethodID }) => {
  const onTopUpButtonClick = (paymentMode, amount) => {
    onTopUpClick({ amount, paymentMode, methodID: method.id, phone });
  };

  const [amount, onAmountChange] = useState();
  const [phone, onPhoneChange] = useState('');

  const b = block('top-up-method');
  return (
    <section className={b('bottom')}>
      <div className={b('info')}>
        <div className={b('left')}>
          <img className={b('img')} src={method.iconFileNames} alt="top-up-method" />
        </div>
      </div>
      <form
        className={b('top-up')}
        onSubmit={e => {
          e.preventDefault();
          onTopUpButtonClick(method.paymentMode, amount);
        }}
      >
        <label className={b('item')}>
          <div className={b('item-title')}>
            {locale.amount}
          </div>
          <div className={b('item-field')}>
            <Input
              value={amount}
              name="amount"
              type="number"
              callBack={e => onAmountChange(e.currentTarget.value)}
            />
          </div>
        </label>
        {method.phoneIsRequired && <label className={b('item')} title={locale.phoneRegulation}>
          <div className={b('item-field')}>
            <Input
              value={phone}
              name="phone"
              type="tel"
              callBack={e => onPhoneChange(e.currentTarget.value)}
              minLength="10"
              maxLength="15"
              placeholder={locale.phone}
            />
          </div>
        </label>}
        <div className={b('button')}>
          <Button
            text={locale.replenish}
            size="low"
            color="green"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

TopUpMethodBlock.propTypes = {
  locale: PropTypes.object.isRequired,
  method: PropTypes.object.isRequired,

  onTopUpClick: PropTypes.func.isRequired,
  changeMethodID: PropTypes.func.isRequired,
};

export default TopUpMethodBlock;