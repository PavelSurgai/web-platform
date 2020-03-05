import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import './SingleItem.scss';
import logo from '../img/logo.svg';

const SingleItem = ({ locale, bet, onCartClick, cashoutBets, currency, fullName, isActiveUseName }) => {
  const b = block('single-item');
  const { date, name, amountIn, coef, status, match, score, code, tourneyName, amountOut, id, eventDate } = bet;
  const result = status === 34 || status === 4 || status === 17410 ? locale.resultWin : locale.possibleWin;
  const gain = amountOut == 0 ? (amountIn * coef).toFixed(2) : amountOut;
  return (
    <div className={b({ status })}>
      {isActiveUseName && <div className={b('full-name')}>{fullName}</div>}
      <div className={b('title')}>
        <div className={b('type')}>
          {locale.single}
        </div>
        <div className={b('status', { status })}>
          {locale.mobileBetStatuses[status]}
        </div>
      </div>
      <div className={b('header')}>
        <div className={b('date-bet')}>{date}</div>
        <SVGInline className={b('logo').toString()} svg={logo} />
        <div className={b('id')}>{`ID ${code}`}</div>
      </div>
      <div className={b('body')}>
        <div className={b('teams')}>{match}</div>
        <div className={b('coef-info')}>
          <div className={b('coef')}>
            {coef}
          </div>
          <div className={b('coef-name')}>
            {name}
          </div>
        </div>
        <div className={b('score')}>
          {`${locale.score}: ${score}`}
        </div>
        <div className={b('game-info')}>
          {tourneyName}
          <div className={b('event-date')}>{eventDate}</div>
        </div>
      </div>
      <div className={b('footer')}>
        <div className={b('black-ball', { first: true })} />
        <div className={b('black-ball', { last: true })} />
        <div className={b('footer-column', { first: true })}>
          <div className={b('footer-text')}>
            {locale.bet}
          </div>
          <div className={b('footer-value')}>
            {amountIn}
          </div>
        </div>
        <div className={b('footer-column')}>
          <div className={b('footer-text')}>
            {locale.coefShort}
          </div>
          <div className={b('footer-value')}>
            {coef}
          </div>
        </div>
        <div className={b('footer-column', { last: true })}>
          <div className={b('footer-text')}>
            {result}
          </div>
          <div className={b('footer-value')}>
            {status === 4 ? 0 : gain}
          </div>
        </div>
      </div>
      {status === 1 && cashoutBets[id] !== undefined &&
        <div className={b('sell-bet')} onClick={() => onCartClick(id)}>
          {`${locale.sale} ${cashoutBets[id].returnAmount} ${currency}`}
        </div>
      }
    </div>
  );
};

SingleItem.propTypes = {
  bet: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  cashoutBets: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isActiveUseName: PropTypes.bool.isRequired,

  onCartClick: PropTypes.func.isRequired,
};

export default SingleItem;
