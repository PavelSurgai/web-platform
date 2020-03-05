import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Input from 'components/Input/mobile';
import Button from 'components/Button/mobile';
import './CashierMethodBlock.scss';

const CashierMethodBlock = ({ cashier, amount, changeAmount, withdrawal, locale }) => {
  const b = block('cashier-method-block');
  return (
    <form
      className={b()}
      onSubmit={e => {
        e.preventDefault();
        withdrawal(amount, cashier.ID);
      }}>
      <label className={b('row')}>
        <span className={b('item-title')}>{locale.amount}</span>
        <div className={b('item-field')}>
          <Input
            value={amount}
            name="amount"
            type="number"
            callBack={e => changeAmount(e.currentTarget.value)}
            isRequired
          />
        </div>
      </label>
      <label className={b('row')}>
        <span className={b('item-title')}>{locale.cashier}</span>
        <div className={b('item-field')}>
          <Input
            value={`${cashier.name} ${cashier.address}`}
            name="cashier"
            type="text"
            callBack={f => f}
            isRequired
            disabled
          />
        </div>
      </label>
      <div className={b('button')}>
        <Button
          text={locale.withdrawal}
          size="low"
          color="green"
          type="submit"
        />
      </div>
    </form>
  );
};

CashierMethodBlock.propTypes = {
  locale: PropTypes.object.isRequired,
  cashier: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,

  changeAmount: PropTypes.func.isRequired,
  withdrawal: PropTypes.func.isRequired,
};

export default CashierMethodBlock;