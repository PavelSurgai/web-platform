import React from 'react';
import block from 'bem-cn';

import './TransactionItem.scss';

const TransactionItem = ({ item }) => {
  const b = block('transaction-item');
  return (
    <div className={b()}>
      <span className={b('column', { type: 'left' })}>{item.email}</span>
      <span className={b('column', { type: 'center' })}>{item.date}</span>
      <span className={b('column-amount', { type: 'right' }, { colored: item.amount > 0 })}>{item.amount}</span>
      <span className={b('column', { type: 'right' })}>{item.balance}</span>
    </div>
  );
};

export default TransactionItem;