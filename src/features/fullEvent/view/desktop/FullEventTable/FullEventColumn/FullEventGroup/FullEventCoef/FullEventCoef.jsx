import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './FullEventCoef.scss';

const FullEventCoef = ({ coef, addToBasket, isSelect, oddType }) => {
  const b = block('full-event-coef');
  const foraSize = coef.foraSize !== undefined ? ` (${coef.foraSize})` : '';
  const totalSize = coef.totalSize !== undefined ? ` (${coef.totalSize})` : '';
  return (
    <div
      className={b({ blocked: coef.block }, { select: isSelect })}
      onClick={() => addToBasket(coef)}>
      <div className={b('name')}>
        {`${coef.shortName}${foraSize}${totalSize}`}
      </div>
      <div className={b('rate', { select: isSelect }).mix(coef.updateStatus)}>
        {coef.rate[oddType]}
      </div>
    </div>
  );
};

FullEventCoef.propTypes = {
  coef: PropTypes.shape({
    ID: PropTypes.string,
    betNameLong: PropTypes.string,
    betNameShort: PropTypes.string,
    block: PropTypes.bool,
    ocGroupID: PropTypes.number,
    ocGroupName: PropTypes.string,
    rate: PropTypes.shape({
      american: PropTypes.string,
      decimal: PropTypes.string,
      fractional: PropTypes.string,
    }),
    totalSize: PropTypes.number,
    updateStatus: PropTypes.string,
  }).isRequired,
  oddType: PropTypes.string.isRequired,
  addToBasket: PropTypes.func.isRequired,
  isSelect: PropTypes.bool.isRequired,
};

export default FullEventCoef;
