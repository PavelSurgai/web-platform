import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import Spinner from 'components/Spinner';
import Button from 'components/Button/mobile';

import './SellBet.scss';

export const SellBet = props => {
  const b = block('sell-bet');
  const { actionProcessing, sellBetId, cashoutBets, currency, closeFunction, sellBet, getBetHistory, locale } = props;

  let bet = false;
  Object.keys(cashoutBets).forEach(key => {
    if (+key === +sellBetId) {
      bet = cashoutBets[key];
    }
  });

  return !actionProcessing && (
    <div className={b()}>
      <div className={b('header')}>{locale.sellBet}</div>
      <div className={b('main')}>
        {bet ? <span className={b('text')}>
          {`${locale.sureToSell} ${bet.betCode} `}
          {`${locale.for} ${bet.returnAmount} ${currency}`}
        </span> : <div className={b('error')}>
          {locale.betNotSell}
        </div>}
        {bet && <div className={b('buttons')}>
          <Button
            text={locale.yes}
            callBack={() => sellBet(sellBetId, bet.betCode, () => {
              closeFunction();
              getBetHistory();
            })} />
          <Button callBack={closeFunction} text={locale.no} />
        </div>}
      </div>
    </div>
  );
};

SellBet.propTypes = {
  actionProcessing: PropTypes.bool.isRequired,
  sellBetId: PropTypes.number.isRequired,
  cashoutBets: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,

  closeFunction: PropTypes.func.isRequired,
  sellBet: PropTypes.func.isRequired,
  getBetHistory: PropTypes.func.isRequired,
};
