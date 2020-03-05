import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './StatisticItem.scss';

const StatisticItem = ({ statisticItem, callBack, isActive }) => {
  const b = block('statistic-item');
  const text = `${statisticItem.text[0].toUpperCase()}${statisticItem.text.slice(1)}`;
  return (
    <div className={b({ active: isActive })} onClick={() => callBack()}>
      {text}
    </div>
  );
};

StatisticItem.propTypes = {
  statisticItem: PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  callBack: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default StatisticItem;
