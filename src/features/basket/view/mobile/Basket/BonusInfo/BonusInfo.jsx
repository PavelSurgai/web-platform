import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import BottomPopUp from 'components/BottomPopUp';
import PopUpButton from 'components/PopUpButton';

import './BonusInfo.scss';

export const BonusInfo = ({ locale, bonusLimits, isAuth, closeFunction }) => {
  const b = block('bonus-info');
 
  return (
    <BottomPopUp closeFunction={closeFunction}>
      <div className={b()}>
        <div className={b('content-container')}>
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
            <div className={b('button')}>
              <PopUpButton
                text={locale.ok}
                onClick={closeFunction}
              />
            </div>
          </React.Fragment> :
          <React.Fragment>
            <div className={b('non-auth-row')}>{locale.pleaseLoginToSeeInfo}</div>
            <PopUpButton
              text={locale.ok}
              onClick={closeFunction}
              />
            <Link className={b('auth-link')} to="/auth/sign-in">
              <PopUpButton
                color="lightblue"
                text={locale.logIn}
                />
            </Link>
          </React.Fragment>}
        </div>
      </div>
    </BottomPopUp>
  );
};

BonusInfo.propTypes = {
  locale: PropTypes.object.isRequired,
  bonusLimits: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,

  closeFunction: PropTypes.func.isRequired,
};