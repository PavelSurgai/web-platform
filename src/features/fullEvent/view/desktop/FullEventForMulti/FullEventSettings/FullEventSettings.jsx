import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import collapseSvg from 'features/fullEvent/view/img/collapse.svg';
import AmountColumnsList from './AmountColumnsList/AmountColumnsList';
import StatisticList from './StatisticList/StatisticList';

import './FullEventSettings.scss';

const FullEventSettings =
  ({ amountColumns, changeAmountColumns, tempEventID, statisticList, changeTempEventID, openAllGroups, allCoefsGroupIsOpen }) => {
    const b = block('full-event-settings');
    return (
      <div className={b()}>
        <StatisticList tempEventID={tempEventID} statisticList={statisticList} changeTempEventID={changeTempEventID} />
        <div className={b('icons')}>
          <AmountColumnsList amountColumns={amountColumns} callBack={changeAmountColumns} />
          <div
            className={b('collapse-button')}
            onClick={() => openAllGroups()}>
            <SVGInline svg={collapseSvg} className={b('icon', { closed: allCoefsGroupIsOpen }).toString()} />
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
  allCoefsGroupIsOpen: PropTypes.bool,
};

export default FullEventSettings;
