import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import amountColumnList from '../../../../data/amountColumnSettings';

import './AmountColumnsList.scss';

const AmountColumnsList = ({ amountColumns, callBack }) => {
  const b = block('amount-column-list');
  const itemList = amountColumnList.map(item => (
    <div
      key={item.amount}
      className={b('item', { active: item.amount === amountColumns })}
      onClick={() => callBack(item.amount)}>
      <SVGInline svg={item.icon} className={b('icon').toString()} />
    </div>
  ));
  return (
    <div className={b()}>
      {itemList}
    </div>
  );
};

AmountColumnsList.propTypes = {
  callBack: PropTypes.func.isRequired,
  amountColumns: PropTypes.number.isRequired,
};

export default AmountColumnsList;
