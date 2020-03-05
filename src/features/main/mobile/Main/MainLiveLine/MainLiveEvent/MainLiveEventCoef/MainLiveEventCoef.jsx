import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './MainLiveEventCoef.scss';

const MainLiveEventCoef = ({ coef, addToBasket, isSelect, oddType }) => {
  const b = block('main-live-event-coef');
  return (
    <div className={b({ select: isSelect }).mix(`main-live-event-coef__${coef.updateStatus}`)} onClick={() => addToBasket(coef)}>
      <div className={b('name')}>{coef.shortName}</div>
      <div className={b('rate', { select: isSelect })}>{coef.rate[oddType]}</div>
    </div>
  );
};

MainLiveEventCoef.propTypes = {
  oddType: PropTypes.string.isRequired,
  coef: PropTypes.object.isRequired,
  addToBasket: PropTypes.func.isRequired,
  isSelect: PropTypes.bool.isRequired,
};

export default MainLiveEventCoef;