import React, { useState, useCallback, useEffect } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import CircleDiagramm from 'components/CircleDiagramm';
import ArrowSVG from './img/arrow.svg';
import BetItem from './BetItem';
import logo from '../img/logo.svg';

import './MultiItem.scss';

const MultiItem = ({ bet, locale, getBetContent, betContents, cashoutBets, currency,
  fullName, isActiveUseName, onCartClick }) => {
  const b = block('multi-item');
  const [isOpen, changeOpen] = useState(false);
  const { date, amountIn, coef, countEvents, status, code, amountOut, id } = bet;
  useEffect(() => {
    getBetContent(id);
  }, []);
  const onClick = useCallback(() => {
    changeOpen(!isOpen);
    // if (!betContents[id] && !isOpen) {
    //   getBetContent(id);
    // }
  }, [isOpen]);
  const gain = amountOut == 0 ? (amountIn * coef).toFixed(2) : amountOut;
  const items = betContents[id] ? betContents[id].map(item => <BetItem
    key={`${item.match}${item.date}`}
    bet={item}
    locale={locale}
  />) : null;
  const amountEndedEvents = betContents[id] ? Object.values(betContents[id]).filter(item => [-1, 1, 16].indexOf(item.status) === -1).length : 0;
  const amountContinuedEvents = betContents[id] ? Object.values(betContents[id]).length - amountEndedEvents : 0;
  const result = status === 34 || status === 4 || status === 17410 ? locale.resultWin : locale.possibleWin;
  return (
    <div className={b({ status })}>
      {isActiveUseName && <div className={b('full-name')}>{fullName}</div>}
      <div className={b('title')} onClick={onClick}>
        <div className={b('type')}>
          {`${locale.express}: ${countEvents}`}
          <SVGInline svg={ArrowSVG} className={b('arrow', { isOpen }).toString()} />
        </div>
        <div className={b('status', { status })}>
          {locale.mobileBetStatuses[status]}
        </div>
      </div>
      
      <div className={b('header')}>
        <div className={b('date-bet')}>{date}</div>
        <SVGInline className={b('logo').toString().toString()} svg={logo} />
        <div className={b('id')}>{`ID ${code}`}</div>
      </div>
      <div className={b('items')}>{isOpen && items}</div>
      <div className={b('footer', { isOpen })}>
        <div className={b('express-statistic')}>
          <div className={b('diagramm-container')}>
            <CircleDiagramm
              allAmount={+amountEndedEvents + +amountContinuedEvents}
              selectorAmount={+amountEndedEvents} />
          </div>
          <div className={b('express-text')}>
            <div className={b('express-ended')}>
              {`${locale.endedAmount}: ${amountEndedEvents}`}
            </div>
            <div className={b('express-continue')}>
              {`${locale.continuedAmount}: ${amountContinuedEvents}`}
            </div>
          </div>
        </div>
        <div className={b('footer-content')}>
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
      </div>
      {status === 1 && cashoutBets[id] !== undefined &&
        <div className={b('sell-bet')} onClick={() => onCartClick(id)}>
          {`${locale.sale} ${cashoutBets[id].returnAmount} ${currency}`}
        </div>
      }
    </div>
  );
};

MultiItem.propTypes = {
  bet: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  betContents: PropTypes.object.isRequired,
  cashoutBets: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  isActiveUseName: PropTypes.bool.isRequired,

  getBetContent: PropTypes.func.isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default MultiItem;
