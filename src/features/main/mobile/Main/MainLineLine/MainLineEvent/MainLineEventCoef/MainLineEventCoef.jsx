import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './MainLineEventCoef.scss';

const MainLineEventCoef = ({ coef, addToBasket, isSelect, oddType }) => {
  const b = block('main-line-event-coef');

  return (
    <div className={b({ select: isSelect }).mix(coef.updateStatus)} onClick={() => addToBasket(coef)}>
      <div className={b('name')}>{coef.shortName}</div>
      <div className={b('rate', { select: isSelect })}>{coef.rate[oddType]}</div>
    </div>
  );
};

MainLineEventCoef.propTypes = {
  oddType: PropTypes.string.isRequired,
  coef: PropTypes.object.isRequired,
  addToBasket: PropTypes.func.isRequired,
  isSelect: PropTypes.bool.isRequired,
};

export default MainLineEventCoef;