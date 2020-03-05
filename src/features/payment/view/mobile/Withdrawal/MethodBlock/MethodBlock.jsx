import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Input from 'components/Input/mobile';
import Button from 'components/Button/mobile';
import './MethodBlock.scss';

export const MethodBlock = ({ name, type, locale, withdrawal, changeMethodID, method }) => {
  const b = block('top-up-method-block');
  const [requisites, changeRequisites] = useState('');
  const [amount, changeAmount] = useState('');
  return (
    <section className={b()}>
      <div className={b('info')}>
        <div className={b('left')}>
          <img className={b('img')} src={method.iconFileNames} alt="top-up-method" />
        </div>
      </div>
      <form
        className={b('main')}
        onSubmit={e => {
          e.preventDefault();
          withdrawal({ type, amount, requisites });
        }}>
        <div className={b('top')}>
          <label className={b('item')}>
            <div className={b('item-title')}>
              {locale.requisites}
            </div>
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
            <div className={b('item-title')}>
              {locale.amount}
            </div>
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
        </div>
        
        <div className={b('bottom')}>
          <div className={b('button')}>
            <Button
              text={locale.withdrawal}
              size="low"
              color="green"
              type="submit"
            />
          </div>
        </div>
        
      </form>
    </section>
  );
};

MethodBlock.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
  method: PropTypes.object.isRequired,
  
  withdrawal: PropTypes.func.isRequired,
  changeMethodID: PropTypes.func.isRequired,
};