import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import Input from 'components/Input/desktop';
import SwitchBox from 'components/SwitchBox/desktop';
import QuestSVG from '../../../img/quest-mark.svg';
import './BasketInfo.scss';

export const BasketInfo = props => {
  const b = block('basket-info');
  const { locale, coef, amount, currency, limits, possiblePrize,
    icAcceptChangeCoefs, changeAmount, changeAccept, oddType,
    isBonus, changeIsBonus, openBonusInfo, bonusPercent, setMaxToAmount } = props;
  return (
    <section className={b()}>
      <div className={b('row')}>
        <div>{`${locale.totalCoef}:`}</div>
        {coef[oddType]}
      </div>
      <div className={b('horizontal-line')} />
      <div className={b('row')}>
        <div className={b('sum')}>
          {`${locale.sum}:`}
          <div className={b('input')}>
            <Input value={amount} name="amount" callBack={changeAmount} />
            <div className={b('currency')}>{currency}</div>
          </div>
        </div>
      </div>
      <div className={b('horizontal-line')} />
      <div className={b('row')}>
        <div>{`${locale.bonusAmount}:`}</div>
        {isBonus ? (bonusPercent * amount).toFixed(2) : 0}
      </div>
      <div className={b('horizontal-line')} />
      <div className={b('row')}>
        <div>{`${locale.minAmount}:`}</div>
        {limits.min}
      </div>
      <div className={b('horizontal-line')} />
      <div className={b('row', { 'max-amount': true })} onClick={() => setMaxToAmount()}>
        <div>{`${locale.maxAmount}:`}</div>
        <b>{limits.max}</b>
      </div>
      <div className={b('horizontal-line')} />
      <div className={b('row')}>
        <div>{`${locale.possiblePrize}:`}</div>
        {possiblePrize}
      </div>
      <div className={b('horizontal-line')} />
      <div className={b('row')}>
        <div>{locale.acceptCahngeCoefs}</div>
        <SwitchBox isActive={icAcceptChangeCoefs} callBack={changeAccept} />
      </div>
      <div className={b('horizontal-line')} />
      <div className={b('row')}>
        <div className={b('row-left')}>
          <span className={b('row-text')}>
            {locale.useBonusBalance}
          </span>
          <SVGInline
            className={b('quest-icon').toString()}
            svg={QuestSVG}
            onClick={() => openBonusInfo()} />
        </div>
        <SwitchBox isActive={isBonus} callBack={changeIsBonus} />
      </div>
    </section>
  );
};

BasketInfo.propTypes = {
  locale: PropTypes.object,
  coef: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  limits: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }).isRequired,
  possiblePrize: PropTypes.number.isRequired,
  icAcceptChangeCoefs: PropTypes.bool.isRequired,
  oddType: PropTypes.string.isRequired,
  isBonus: PropTypes.bool.isRequired,
  bonusPercent: PropTypes.number.isRequired,

  changeAmount: PropTypes.func.isRequired,
  changeAccept: PropTypes.func.isRequired,
  changeIsBonus: PropTypes.func.isRequired,
  openBonusInfo: PropTypes.func.isRequired,
  setMaxToAmount: PropTypes.func.isRequired,
};
