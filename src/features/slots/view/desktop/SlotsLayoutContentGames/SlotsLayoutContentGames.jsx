import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './SlotsLayoutContentGames.scss';

const SlotsLayoutContentGames = ({ slotsGames }) => {
  const b = block('slots-layout-content');
  console.log('slots', slotsGames);
  return (
    <div className={b('icons')}>
      {slotsGames}
    </div>
  );
};

SlotsLayoutContentGames.propTypes = {
  slotsGames: PropTypes.array.isRequired,
}

export default SlotsLayoutContentGames;
