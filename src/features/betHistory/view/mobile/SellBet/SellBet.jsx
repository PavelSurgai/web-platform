import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import Spinner from 'components/Spinner';
import PopUpButton from 'components/PopUpButton';

import './SellBet.scss';

export const SellBet = props => {
  const b = block('sell-bet');
  const { actionProcessing, sellBetId, cashoutBets, currency, closeFunction, sellBet, getBetHistory,
    locale } = props;

  let bet = false;
  Object.keys(cashoutBets).forEach(key => {
    if (+key === +sellBetId) {
      bet = cashoutBets[key];
    }
  });

  return (
    <div className={b()}>
      <Spinner isLoading={actionProcessing} />
      <div className={b('main')}>
        {bet ?
          <>
            <span className={b('text')}>
              {locale.sureToSell}
            </span>
            <span className={b('highlighted-text')}>
              {bet.betCode}
            </span>
            <span className={b('text')}>
              {locale.for}
            </span>
            <span className={b('highlighted-text')}>
              {`${bet.returnAmount} ${currency}`}
            </span>
          </> : <div className={b('error')}>
            {locale.betNotSell}
          </div>}
        {bet && <div className={b('buttons')}>
          <PopUpButton
            text={locale.yes}
            onClick={() => sellBet(sellBetId, bet.betCode, () => {
              closeFunction();
              getBetHistory();
            })}
          />
          
          <PopUpButton
            color="lightblue"
            onClick={closeFunction}
            text={locale.no}
          />
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
