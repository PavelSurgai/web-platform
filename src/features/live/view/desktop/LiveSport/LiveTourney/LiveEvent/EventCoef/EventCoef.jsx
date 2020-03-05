import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './EventCoef.scss';

const EventCoef = ({ coef, isActive, addToBasket, isSelect, oddType }) => {
  const b = block('event-coef');
  return (
    <div className={b('wrapper')}>
      <div
        className={b({ active: isActive }, { select: isSelect }).mix(coef.updateStatus)}
        onClick={() => addToBasket(coef)}>
        {coef.rate[oddType]}
      </div>
    </div>
  );
};

EventCoef.propTypes = {
  oddType: PropTypes.string.isRequired,
  coef: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  addToBasket: PropTypes.func.isRequired,
  isSelect: PropTypes.bool.isRequired,
};

export default EventCoef;
