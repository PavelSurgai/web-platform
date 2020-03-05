import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import BasketBetItem from './BasketBetItem';

import './BasketBetList.scss';

const BasketBetList = ({ bets, removeFromBasket, oddType }) => {
  const b = block('basket-bet-list');
  const betList = bets.map(tempBet => <BasketBetItem key={tempBet.ID} bet={tempBet} removeFromBasket={removeFromBasket} oddType={oddType} />);
  return (
    <div className={b()}>
      {betList}
    </div>
  );
};

BasketBetList.propTypes = {
  bets: PropTypes.array.isRequired,
  oddType: PropTypes.string.isRequired,

  removeFromBasket: PropTypes.func.isRequired,
};

export default BasketBetList;