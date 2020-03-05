import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './BonusInfo.scss';

export const BonusInfo = ({ locale, bonusLimits, isAuth }) => {
  const b = block('bonus-info');

  return (
    <section className={b()}>
      {isAuth ? <React.Fragment>
        <h3 className={b('title')}>{locale.bonusRules}</h3>
        <div className={b('row')}>
          <span className={b('row-title')}>{locale.betCashback}</span>
          <span className={b('row-value')}>{bonusLimits.cashbackBet}</span>
        </div>

        <div className={b('row')}>
          <span className={b('row-title')}>{locale.maxBetInMount}</span>
          <span className={b('row-value')}>{bonusLimits.maxBetCount}</span>
        </div>

        <div className={b('row')}>
          <span className={b('row-title')}>{locale.maxBonusBetAmout}</span>
          <span className={b('row-value')}>{bonusLimits.maxBonusSize && bonusLimits.maxBonusSize.toFixed(2)}</span>
        </div>

        <div className={b('row')}>
          <span className={b('row-title')}>{locale.bonusPercentFromBet}</span>
          <span className={b('row-value')}>{`${bonusLimits.maxBonusPercent * 100}%`}</span>
        </div>

        <div className={b('row')}>
          <span className={b('row-title')}>{locale.minimalCoef}</span>
          <span className={b('row-value')}>{bonusLimits.minCoef}</span>
        </div>
      </React.Fragment> : <span className={b('row-title')}>{locale.pleaseLoginToSeeInfo}</span>}
    </section>
  );
};

BonusInfo.propTypes = {
  locale: PropTypes.object.isRequired,
  bonusLimits: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
};