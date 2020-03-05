import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import FullEventGroup from './FullEventGroup/FullEventGroup';
import amountColumnList from '../../../../data/amountColumnSettings';
import './FullEventColumn.scss';

const FullEventColumn = ({ coefGroups, amountColumns, changeVisibleGroup, addToBasket, selectedRates, oddType }) => {
  const b = block('full-event-column');
  const groupList = coefGroups.map((temp, index) => <FullEventGroup
    key={index}
    changeVisibleGroup={changeVisibleGroup}
    amountColumns={amountColumns}
    oddType={oddType}
    group={temp}
    addToBasket={addToBasket}
    selectedRates={selectedRates} />);
  return (
    <div className={b({ width: amountColumnList.find(temp => temp.amount === amountColumns).classText })}>
      {groupList}
    </div>
  );
};

FullEventColumn.propTypes = {
  changeVisibleGroup: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  coefGroups: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.string,
    coefs: PropTypes.array,
    name: PropTypes.string,
    isOpen: PropTypes.bool,
  })).isRequired,
  oddType: PropTypes.string.isRequired,
  amountColumns: PropTypes.number.isRequired,
  selectedRates: PropTypes.array.isRequired,
};

export default FullEventColumn;
