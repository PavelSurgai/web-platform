
import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import CartSVG from '../img/cart.svg';
import ArrowSVG from './img/arrow.svg';
import { BetItem } from './BetItem';
import './MultiItem.scss';

export const MultiItem = ({ bet, locale, getBetContent, betContents, onCartClick }) => {
  const b = block('multi-item');
  const [isOpen, changeOpen] = useState(false);
  const [touch, onTouch] = useState(0);
  const [remove, onRemove] = useState(false);
  const { date, amountIn, amountOut, coef, status, countEvents, id, code } = bet;
  const gain = amountOut == 0 ? (amountIn * coef).toFixed(2) : amountOut;
  const onClick = () => {
    changeOpen(!isOpen);
    if (!betContents[id] && !isOpen) {
      getBetContent(id);
    }
  };
  const items = betContents[id] ? betContents[id].map(item => <BetItem
    key={item.id}
    bet={item}
    locale={locale}
  />) : null;
  const eventsTypeText = () => {
    if (countEvents > 10 && countEvents < 21) return 'eventsTypeThree';
    const lastSumbol = +countEvents.toString().split('')[countEvents.toString().length - 1];
    if ([1, 2, 3, 4].findIndex(t => t === lastSumbol) === -1) return 'eventsTypeThree';
    return lastSumbol === 1 ? 'eventsTypeOne' : 'eventsTypeTwo';
  };
  return (
    <div className={b('wrapper', { open: isOpen }, { remove })}>
      <div className={b({ open: isOpen })}>
        <div className={b('bets-table-cell', { type: 'date' })} onClick={() => onTouch(0)}>{date}</div>
        <div className={b('bets-table-cell', { type: 'info' })} onClick={onClick}>
          {`${locale.express.toUpperCase()}: ${countEvents} ${locale[eventsTypeText()].toUpperCase()}`}
          <SVGInline className={b('arrow').toString()} svg={ArrowSVG} />
        </div>
        <div className={b('bets-table-cell', { type: 'amount' })}>{amountIn}</div>
        <div className={b('bets-table-cell', { type: 'odd' })} onClick={f => touch === 5 ? onRemove(true) : f}>{coef.toFixed(2)}</div>
        <div className={b('bets-table-cell', { type: 'possible' })}>{status == 4 ? 0 : gain}</div>
        <div className={b('bets-table-cell', { type: 'code' })} onClick={f => touch > 2 ? onTouch(touch + 1) : f}>{code}</div>
        {[1, -1, 3, 16].findIndex(t => t === status) !== -1 && <div className={b('bets-table-cell', { type: 'cart' })} onClick={() => onCartClick(id)}>
          <div className={b('cart-circle')}>
            <SVGInline className={b('cart')} svg={CartSVG} />
          </div>
        </div>}
        <div className={b('status-bar', { status })} onClick={f => touch < 3 ? onTouch(touch + 1) : f}>{locale.betStatuses[status]}</div>
      </div>
      {isOpen && <div className={b('items')}>{items}</div>}
    </div>
  );
};

MultiItem.propTypes = {
  bet: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  betContents: PropTypes.object.isRequired,

  getBetContent: PropTypes.func.isRequired,
  onCartClick: PropTypes.func.isRequired,
};