import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import FullEventColumn from './FullEventColumn/FullEventColumn';
import './FullEventTable.scss';

const FullEventTable = ({ coefGroups, amountColumns, changeVisibleGroup, addToBasket, selectedRates, oddType }) => {
  const b = block('full-event-table');
  let columnArray = null;
  switch (amountColumns) {
    case 1: {
      columnArray = <FullEventColumn
        coefGroups={coefGroups}
        oddType={oddType}
        amountColumns={amountColumns}
        changeVisibleGroup={changeVisibleGroup}
        addToBasket={addToBasket}
        selectedRates={selectedRates} />;
      break;
    }
    case 2: {
      const firstColumn = coefGroups.filter((temp, index) => index % amountColumns === 0);
      const secondColumn = coefGroups.filter((temp, index) => (index - 1) % amountColumns === 0);
      columnArray = [firstColumn, secondColumn].map((temp, index) => <FullEventColumn
        key={index}
        coefGroups={temp}
        oddType={oddType}
        amountColumns={amountColumns}
        changeVisibleGroup={changeVisibleGroup}
        addToBasket={addToBasket}
        selectedRates={selectedRates} />);
      break;
    }
    case 3: {
      const firstColumn = coefGroups.filter((temp, index) => index % amountColumns === 0);
      const secondColumn = coefGroups.filter((temp, index) => (index - 1) % amountColumns === 0);
      const thirdColumn = coefGroups.filter((temp, index) => (index - 2) % amountColumns === 0);
      columnArray = [firstColumn, secondColumn, thirdColumn].map((temp, index) => <FullEventColumn
        key={index}
        coefGroups={temp}
        oddType={oddType}
        amountColumns={amountColumns}
        changeVisibleGroup={changeVisibleGroup}
        addToBasket={addToBasket}
        selectedRates={selectedRates} />);
      break;
    }
    default: {
      break;
    }
  }
  return (
    <div className={b()}>
      {columnArray}
    </div>
  );
};

FullEventTable.propTypes = {
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

export default FullEventTable;
