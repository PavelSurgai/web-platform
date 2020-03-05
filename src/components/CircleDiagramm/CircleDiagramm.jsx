import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './CircleDiagramm.scss';

const CircleDiagramm = ({ allAmount, selectorAmount }) => {
  const b = block('circle-diagramm');
  const percent = Math.trunc(selectorAmount * 100 / (allAmount === 0 ? 1 : allAmount));
  const fillRadius = Math.trunc(allAmount === 0 ? 0 : (selectorAmount * 360 / allAmount));
  const amountBlocks = Math.trunc(fillRadius / 90);
  let fillBlocks = [null, null, null, null];
  fillBlocks.forEach((temp, index) => {
    if (index < amountBlocks) {
      fillBlocks[index] = <div
        className={b('fill-block')}
        key={index}
        style={{
          transform: `rotate(${90 * index}deg)`,
        }}
      />;
    }
  });
  fillBlocks[3] = <div
    className={b('fill-block')}
    style={{
      transform: `rotate(${90 * (amountBlocks - (fillRadius === 360 ? 1 : 0))}deg) skewY(${(fillRadius === 360 ? 0 : 90 + (fillRadius - (90 * amountBlocks)))}deg)`,
    }}
  />;
  return <div className={b()}>
    <div className={b('text')}>
      {`${percent}%`}
    </div>
    {fillBlocks}
  </div>;
};

CircleDiagramm.ropTypes = {
  allAmount: PropTypes.number.isRequired,
  selectorAmount: PropTypes.number.isRequired,
};

export default CircleDiagramm;