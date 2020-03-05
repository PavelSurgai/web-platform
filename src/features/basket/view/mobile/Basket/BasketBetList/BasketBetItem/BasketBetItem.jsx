import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import removeIcon from '../../../../img/remove-icon.svg';

import './BasketBetItem.scss';

const BasketBetItem = ({ bet, removeFromBasket, oddType }) => {
  const b = block('basket-bet-item');
  const longName = bet.betslipInfo.fs !== null ? `${bet.longName} (${bet.betslipInfo.fs})` : bet.longName;
  return (
    <div className={b('wrapper')}>
      <div className={b()}>
        <div className={b('teams')}>
          {bet.teams}
          <SVGInline className={b('remove').toString()} svg={removeIcon} onClick={() => removeFromBasket(bet)} />
        </div>
        <div className={b('rate')}>
          <div className={b('coef')}>{bet.rate[oddType]}</div>
          <div className={b('bet-name')}>{longName}</div>
        </div>
        <div className={b('bottom')}>
          {`${bet.sportName} - ${bet.tourneyName}`}
          <span className={b('date')}>{bet.date}</span>
        </div>
        
      </div>
    </div>
  );
};

BasketBetItem.propTypes = {
  bet: PropTypes.object.isRequired,
  oddType: PropTypes.string.isRequired,
  
  removeFromBasket: PropTypes.func.isRequired,
};

export default BasketBetItem;
