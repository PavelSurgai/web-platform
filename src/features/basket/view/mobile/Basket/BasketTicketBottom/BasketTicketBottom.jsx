import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './BasketTicketBottom.scss';

export const BasketTicketBottom = ({ possible, amount, totalCoef, currency, locale }) => {
  const b = block('basket-ticket-bottom');

  return (
    <div className={b()}>
      <div className={b('left')}>
        <div className={b('item')}>
          <span className={b('item-title')}>{locale.bet}</span>
          <span className={b('item-value')}>{`${amount} ${currency}`}</span>
        </div>

        <div className={b('item')}>
          <span className={b('item-title')}>{locale.totalCoef}</span>
          <span className={b('item-value')}>{totalCoef}</span>
        </div>
      </div>
      <div className={b('right')}>
        <div className={b('item')}>
          <span className={b('item-title')}>{locale.possiblePrize}</span>
          <span className={b('item-value')}>{`${possible} ${currency}`}</span>
        </div>
      </div>
    </div>
  );
};

BasketTicketBottom.propTypes = {
  possible: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  totalCoef: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
};
