import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { getCountryById } from 'shared/utils/countries';
import removeIcon from '../../../../img/remove-icon.svg';

import './BasketBetItem.scss';

const BasketBetItem = ({ bet, removeFromBasket, oddType }) => {
  const b = block('basket-bet-item');
  const longName = bet.betslipInfo.fs !== null ? `${bet.longName} (${bet.betslipInfo.fs})` : bet.longName;
  return (
    <div className={b()}>
      <div className={b('header')}>
        {/* <SVGInline className={b('flag').toString()} svg={getCountryById(bet.countryID)} /> */}
        {`${bet.sportName} ${bet.tourneyName ? `- ${bet.tourneyName}` : ''}`}
        <SVGInline className={b('remove').toString()} svg={removeIcon} onClick={() => removeFromBasket(bet)} />
      </div>
      <div className={b('teams')}>
        <div>{bet.teams.split(' - ')[0]}</div>
        {bet.teams.split(' - ')[1]}
      </div>
      <div className={b('rate')}>
        <div className={b('exodus')}>{longName}</div>
        <div className={b('coef')}>{bet.rate[oddType]}</div>
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