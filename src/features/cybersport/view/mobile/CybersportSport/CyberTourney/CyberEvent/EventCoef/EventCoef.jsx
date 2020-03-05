import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './EventCoef.scss';

const EventCoef = ({ coef, isActive, addToBasket, isSelect, oddType }) => {
  const b = block('cyber-event-coef');
  return (
    <div className={b({ active: isActive }, { select: isSelect })} onClick={() => addToBasket(coef)}>
      {coef.shortName}
      <div className={b('rate')}>{coef.rate[oddType]}</div>
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