import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import CartSVG from '../img/cart.svg';
import './SingleItem.scss';

export const SingleItem = ({ locale, bet, onCartClick }) => {
  const b = block('single-item');
  const [touch, onTouch] = useState(0);
  const [remove, onRemove] = useState(false);
  const { date, name, amountIn, amountOut, coef, status, match, score, code, id } = bet;
  const gain = amountOut == 0 ? (amountIn * coef).toFixed(2) : amountOut;
  return (
    <div className={b({ remove })}>
      <div className={b('bets-table-cell', { type: 'date' })} onClick={() => onTouch(0)}>{date}</div>
      <div className={b('bets-table-cell', { type: 'bet' })} title={`${match} ${score}`}>{`${match} ${score}`}</div>
      <div className={b('bets-table-cell', { type: 'outcome' })} title={name}>{name}</div>
      <div className={b('bets-table-cell', { type: 'amount' })}>{amountIn}</div>
      <div className={b('bets-table-cell', { type: 'odd' })} onClick={f => touch === 5 ? onRemove(true) : f}>{coef}</div>
      <div className={b('bets-table-cell', { type: 'possible' })}>{status == 4 ? 0 : gain }</div>
      <div className={b('bets-table-cell', { type: 'code' })} onClick={f => touch > 2 ? onTouch(touch + 1) : f}>{code}</div>
      {[1, -1, 3, 16].findIndex(t => t === status) !== -1 && <div className={b('bets-table-cell', { type: 'cart' })} onClick={() => onCartClick(id)}>
        <div className={b('cart-circle')}>
          <SVGInline className={b('cart')} svg={CartSVG} />
        </div>
      </div>}
      <div className={b('status-bar', { status })} onClick={f => touch < 3 ? onTouch(touch + 1) : f}>{locale.betStatuses[status]}</div>
    </div>
  );
};

SingleItem.propTypes = {
  bet: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,

  onCartClick: PropTypes.func.isRequired,
};