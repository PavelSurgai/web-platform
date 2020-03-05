import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import StatisticList from './StatisticList/StatisticList';
import './FullEventSettings.scss';

const FullEventSettings =
  ({ tempEventID, statisticList, changeTempEventID }) => {
    const b = block('full-event-settings');
    return (
      <div className={b()}>
        <StatisticList tempEventID={tempEventID} statisticList={statisticList} changeTempEventID={changeTempEventID} />
      </div>
    );
  };

FullEventSettings.propTypes = {
  statisticList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  tempEventID: PropTypes.string.isRequired,
  changeTempEventID: PropTypes.func.isRequired,
};

export default FullEventSettings;
