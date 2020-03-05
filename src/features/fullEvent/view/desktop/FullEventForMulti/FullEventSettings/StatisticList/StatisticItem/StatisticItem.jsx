import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './StatisticItem.scss';

const StatisticItem = ({ statisticItem, callBack, isActive }) => {
  const b = block('statistic-item');
  return (
    <div className={b({ active: isActive })} onClick={() => callBack()}>
      {statisticItem.text}
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