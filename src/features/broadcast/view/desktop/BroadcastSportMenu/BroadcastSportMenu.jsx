import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './BroadcastSportMenu.scss';

export const BroadcastSportMenu = ({ sports, onSportClick, activeSport }) => {
  const b = block('broadcast-sport-menu');

  const renderSport = useCallback(sport => {
    const isActive = activeSport === sport.name;

    return (
      <div
        key={sport.name}
        className={b('sport', { active: isActive })}
        data-name={sport.name}
        onClick={onSportClick}
      >
        {sport.name}
      </div>
    );
  }, [activeSport]);

  return (
    <nav className={b()}>
      {sports.map(renderSport)}
    </nav>
  );
};

BroadcastSportMenu.propTypes = {
  sports: PropTypes.array.isRequired,
  activeSport: PropTypes.string.isRequired,

  onSportClick: PropTypes.func.isRequired,
};
