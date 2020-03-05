import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Input from 'components/Input/desktop';
import Button from 'components/Button/desktop';
import './MethodBlock.scss';

export const MethodBlock = ({ name, type, locale, withdrawal }) => {
  const b = block('top-up-method-block');
  const [requisites, changeRequisites] = useState('');
  const [amount, changeAmount] = useState('');
  return (
    <section className={b()}>
      <h5 className={b('title')}>{name}</h5>
      <form
        className={b('main')}
        onSubmit={e => {
          e.preventDefault();
          withdrawal({ type, amount, requisites });
        }}>
        <label className={b('item')}>
          <span className={b('item-title')}>{locale.requisites}</span>
          <div className={b('item-field')}>
            <Input
              value={requisites}
              name="requisites"
              type="text"
              callBack={e => changeRequisites(e.currentTarget.value)}
              isRequired
            />
          </div>
        </label>
        <label className={b('item', { type: 'amount' })}>
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
        <div className={b('button')}>
          <Button
            text={locale.withdrawal}
            size="low"
            color="green"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
};

MethodBlock.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
  
  withdrawal: PropTypes.func.isRequired,
};