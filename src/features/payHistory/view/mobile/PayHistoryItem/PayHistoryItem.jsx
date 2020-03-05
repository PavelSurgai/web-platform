import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import PaymentSVG from './img/payment.svg';
import WithdrawalSVG from './img/withdrawal.svg';
import './PayHistoryItem.scss';

export const PayHistoryItem = ({ item, locale }) => {
  const b = block('pay-history-item');
  const { date, type, status, amount, purse, paymentMode } = item;
  return (
    <div className={b()}>
      <div className={b('main')}>
        <div className={b('left')}>
          <span className={b('type')}>
            {type === 'payment' ? locale.paymentTypes[status] : locale.withdrawalStatuses[item.status]}
          </span>
          <span className={b('date')}>{date}</span>
          <span className={b('purse')}>{purse ? `${paymentMode}: ${purse}` : ''}</span>
        </div>
        <div className={b('right')}>
          <span className={b('amount')}>
            <span className={b('amount-title')}>{`${locale.amount}: `}</span>
            <span className={b('amount-value')}>{amount}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

PayHistoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};