import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import AmountColumnsList from './AmountColumnsList/AmountColumnsList';
import StatisticList from './StatisticList/StatisticList';
import collapseSvg from '../../img/collapse.svg';
import './FullEventSettings.scss';

const FullEventSettings =
  ({ amountColumns, changeAmountColumns, tempEventID, statisticList, changeTempEventID, openAllGroups,
    allCoefsGroupIsOpen }) => {
    const b = block('full-event-settings');
    return (
      <div className={b()}>
        <StatisticList tempEventID={tempEventID} statisticList={statisticList} changeTempEventID={changeTempEventID} />
        <div className={b('icons')}>
          <AmountColumnsList amountColumns={amountColumns} callBack={changeAmountColumns} />
          <div
            className={b('collapse-button')}
            onClick={() => openAllGroups()}>
            <SVGInline svg={collapseSvg} className={b('icon', { collapse: !allCoefsGroupIsOpen }).toString()} />
          </div>
        </div>
      </div>
    );
  };

FullEventSettings.propTypes = {
  statisticList: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  tempEventID: PropTypes.string.isRequired,
  openAllGroups: PropTypes.func.isRequired,
  changeAmountColumns: PropTypes.func.isRequired,
  changeTempEventID: PropTypes.func.isRequired,
  amountColumns: PropTypes.number.isRequired,
  allCoefsGroupIsOpen: PropTypes.bool.isRequired,
};

export default FullEventSettings;
