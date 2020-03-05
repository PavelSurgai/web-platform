import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './BetItem.scss';

export const BetItem = ({ bet, locale }) => {
  const b = block('bet-item');
  const { date, match, score, name, coef, status } = bet;
  return (
    <div className={b()}>
      <div className={b('bets-table-cell', { type: 'date' })}>{date}</div>
      <div
        className={b('bets-table-cell', { type: 'bet' })}
        title={`${match} ${score}`}
      >
        {`${match} ${score}`}
      </div>
      <div className={b('bets-table-cell', { type: 'outcome' })} title={name}>{name}</div>
      <div className={b('bets-table-cell', { type: 'odd' })}>{coef}</div>
      <div className={b('status-bar', { status })}>{locale.eventStatuses[status]}</div>
    </div>
  );
};

BetItem.propTypes = {
  bet: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};