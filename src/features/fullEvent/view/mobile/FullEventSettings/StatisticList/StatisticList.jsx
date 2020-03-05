import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import StatisticItem from './StatisticItem/StatisticItem';
import arrowSvg from '../../../img/arrowToTop.svg';
import './StatisticList.scss';

const StatisticList = ({ tempEventID, statisticList, changeTempEventID }) => {
  const b = block('statistic-list');
  const itemList = statisticList.map(temp => <StatisticItem
    key={temp.value}
    isActive={tempEventID === temp.value}
    callBack={() => changeTempEventID(temp.value)}
    statisticItem={temp} />);
  
  // const leftScroll = e => {
  //   const itemsBlock = e.currentTarget.parentNode.querySelector('.statistic-list__items');
  //   const iterator = i => {
  //     itemsBlock.scrollTo(itemsBlock.scrollLeft - 12, 0);
  //     if (i < 25) setTimeout(() => iterator(i + 1), 1);
  //   };
  //   iterator(0);
  // };

  // const rightScroll = e => {
  //   const itemsBlock = e.currentTarget.parentNode.querySelector('.statistic-list__items');
  //   const iterator = i => {
  //     itemsBlock.scrollTo(itemsBlock.scrollLeft + 12, 0);
  //     if (i < 25) setTimeout(() => iterator(i + 1), 1);
  //   };
  //   iterator(0);
  // };
    
  return (
    <div className={b('container').mix('scrollable')}>
      <div className={b('items')}>
        {itemList}
      </div>
    </div>
  );
};

StatisticList.propTypes = {
  statisticList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  tempEventID: PropTypes.string.isRequired,
  changeTempEventID: PropTypes.func.isRequired,
};

export default StatisticList;
