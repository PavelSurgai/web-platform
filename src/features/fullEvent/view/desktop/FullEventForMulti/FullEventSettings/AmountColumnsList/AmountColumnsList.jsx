import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import amountColumnList from 'features/fullEvent/data/amountColumnSettings';

import './AmountColumnsList.scss';

const AmountColumnsList = ({ amountColumns, callBack }) => {
  const b = block('amount-column-list');
  return (
    <div className={b()}>
      <div
        className={b('item', { active: true })}>
        <SVGInline svg={amountColumnList[0].icon} className={b('icon').toString()} />
      </div>
    </div>
  );
};

AmountColumnsList.propTypes = {
  callBack: PropTypes.func.isRequired,
  amountColumns: PropTypes.number.isRequired,
};

export default AmountColumnsList;
