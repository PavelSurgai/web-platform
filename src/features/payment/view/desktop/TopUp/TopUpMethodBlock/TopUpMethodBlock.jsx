import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Input from 'components/Input/desktop';
import Button from 'components/Button/desktop';

import './TopUpMethodBlock.scss';

const TopUpMethodBlock = ({ method, onTopUpClick, locale }) => {
  const onTopUpButtonClick = (paymentMode, amount, phone) => {
    onTopUpClick({ amount, paymentMode, methodID: method.id, phone });
  };

  const [amount, onAmountChange] = useState(0);
  const [phone, onPhoneChange] = useState('');

  const b = block('top-up-method-block');
  return (
    <section className={b('bottom')}>
      <div className={b('bottom-left')}>
        <h5 className={b('additional-title')}>{locale[method.title]}</h5>
        <form
          className={b(method.phoneIsRequired ? 'top-up-inputs' : 'top-up')}
          onSubmit={e => {
            e.preventDefault();
            onTopUpButtonClick(method.paymentMode, amount, phone);
          }}
        >
          <div className={b('input-items')}>
            <label className={b('item')}>
              <span className={b('item-title')}>{`${locale.amount}:`}</span>
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
              <span className={b('item-title')}>{`${locale.phone}:`}</span>
              <div className={b('item-field')}>
                <Input
                  value={phone}
                  name="phone"
                  type="tel"
                  callBack={e => onPhoneChange(e.currentTarget.value)}
                  minLength="10"
                  maxLength="15"
                  placeholder="791234567890"
                />
              </div>
            </label>}
          </div>
          <div className={b('button')}>
            <Button
              text={locale.replenish}
              size="low"
              color="green"
              type="submit"
            />
          </div>
        </form>
      </div>
      <div className={b('bottom-right')}>
        <img className={b('img')} src={method.iconFileNames} alt="top-up-method" />
      </div>
    </section>
  );
};

TopUpMethodBlock.propTypes = {
  locale: PropTypes.object.isRequired,
  method: PropTypes.object.isRequired,

  onTopUpClick: PropTypes.func.isRequired,
};

export default TopUpMethodBlock;