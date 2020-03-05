import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import Button from 'components/Button/mobile';
import Input from 'components/Input/mobile';
import SwitchBox from 'components/SwitchBox/desktop';
import QuestSVG from '../../../img/quest-mark.svg';
import './BasketInfo.scss';

export const BasketInfo = props => {
  const b = block('basket-info');
  const { locale, coef, amount, currency, limits, possiblePrize,
    icAcceptChangeCoefs, changeAmount, changeAccept, oddType, actionProcessing,
    isBonus, changeIsBonus, openBonusInfo, bonusPercent, onMakeBetClick } = props;
  return (
    <section className={b()}>
      <div className={b('row')}>
        <div className={b('row-text')}>{`${locale.bonusAmount}:`}</div>
        {isBonus ? (bonusPercent * amount).toFixed(2) : 0}
      </div>
      <div className={b('row')}>
        <div className={b('row-text')}>{`${locale.minAmount}:`}</div>
        {limits.min}
      </div>
      <div className={b('row')}>
        <div className={b('row-text')}>{`${locale.maxAmount}:`}</div>
        {limits.max}
      </div>
      
      <div className={b('row-amount')}>
        <div className={b('sum')}>
          {`${locale.sum}:`}
          <div className={b('input')}>
            <Input value={amount} name="amount" callBack={changeAmount} />
            <div className={b('currency')}>{currency}</div>
          </div>
        </div>

        <div className={b('button')}>
          <Button
            text={locale.makeBet}
            color="green"
            callBack={onMakeBetClick}
            disabled={amount < limits.min || actionProcessing} />
        </div>
      </div>

      <div className={b('row')}>
        <div className={b('row-text')}>{locale.acceptCahngeCoefs}</div>
        <SwitchBox isActive={icAcceptChangeCoefs} callBack={changeAccept} />
      </div>

      <div className={b('row')}>
        <div className={b('row-text')}>
          <span>{locale.useBonusBalance}</span>
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
  actionProcessing: PropTypes.bool.isRequired,

  onMakeBetClick: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
  changeAccept: PropTypes.func.isRequired,
  changeIsBonus: PropTypes.func.isRequired,
  openBonusInfo: PropTypes.func.isRequired,
};
