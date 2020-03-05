import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './BroadcastFramesMenu.scss';

export const BroadcastFramesMenu = ({ frames, onClosePlayer, onItemClick, activeFrame }) => {
  const b = block('broadcast-frames-menu');

  const renderItem = useCallback((item, i) => (
    <div
      className={b('item', { active: activeFrame === i })}
      data-index={i}
      onClick={onItemClick}
    >
      {`Frame ${i + 1}`}
    </div>
  ), [activeFrame]);

  return (
    <div className={b()}>
      <div className={b('close')} onClick={onClosePlayer}>Close</div>
      {frames.map(renderItem)}
    </div>
  );
};

BroadcastFramesMenu.propTypes = {
  frames: PropTypes.array.isRequired,
  activeFrame: PropTypes.number.isRequired,

  onClosePlayer: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};