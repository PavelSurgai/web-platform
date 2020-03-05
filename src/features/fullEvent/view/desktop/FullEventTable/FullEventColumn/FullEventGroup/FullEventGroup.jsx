import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import FullEventCoef from './FullEventCoef/FullEventCoef';
import arrowSVG from '../../../../img/arrow.svg';

import './FullEventGroup.scss';

const FullEventGroup = ({ group, changeVisibleGroup, addToBasket, selectedRates, oddType }) => {
  const b = block('full-event-group');
  const rowList = group.coefs.map((tempRow, index) => (<div key={index} className={b('row')}>
    {tempRow.map(tempCoef => <FullEventCoef
      key={tempCoef.ID + tempCoef.longName}
      coef={tempCoef}
      oddType={oddType}
      addToBasket={addToBasket}
      isSelect={selectedRates.find(tempRate => tempRate === tempCoef.ID) !== undefined} />)}
  </div>));

  return (
    <div className={b()}>
      <div className={b('header', { opened: group.isOpen })} onClick={() => changeVisibleGroup(group.ID, !group.isOpen)}>
        <div className={b('mock')} />
        {group.name}
        <div className={b('arrow-container')}>
          <SVGInline className={b('arrow', { opened: group.isOpen }).toString()} svg={arrowSVG} />
        </div>
      </div>
      {group.isOpen && <div className={b('coefficients')}>
        {rowList}
      </div>}
    </div>
  );
};

FullEventGroup.propTypes = {
  changeVisibleGroup: PropTypes.func.isRequired,
  selectedRates: PropTypes.array.isRequired,
  oddType: PropTypes.string.isRequired,
  addToBasket: PropTypes.func.isRequired,
  group: PropTypes.shape({
    ID: PropTypes.string,
    coefs: PropTypes.array,
    name: PropTypes.string,
    isOpen: PropTypes.bool,
  }).isRequired,
};

export default FullEventGroup;
