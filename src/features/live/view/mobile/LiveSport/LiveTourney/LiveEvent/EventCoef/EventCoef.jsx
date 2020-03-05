import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './EventCoef.scss';

const EventCoef = ({ coef, addToBasket, isSelect, oddType }) => {
  const b = block('live-event-coef');

  const onCoefClick = useCallback(() => addToBasket(coef), [addToBasket, coef]);

  return (
    <div className={b({ select: isSelect })} onClick={onCoefClick}>
      <div className={b('wrapper').mix(coef.updateStatus)}>
        {/* <div className={b('name')}>{coef.shortName}</div> */}
        <div className={b('rate')}>{coef.rate[oddType]}</div>
      </div>
    </div>
  );
};

EventCoef.propTypes = {
  oddType: PropTypes.string.isRequired,
  coef: PropTypes.object.isRequired,
  addToBasket: PropTypes.func.isRequired,
  isSelect: PropTypes.bool.isRequired,
};

export default React.memo(EventCoef);