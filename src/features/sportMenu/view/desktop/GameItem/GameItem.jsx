import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import { getSportImgByID } from 'shared/utils/sports';
import './GameItem.scss';

export const GameItem = ({ name, id, isActive, changeActiveGameID }) => {
  const b = block('game-item');
  
  return (
    <li className={b({ active: isActive })} onClick={() => changeActiveGameID(id)}>
      <div className={b('game')}>
        <div className={b('game-left')}>
          <img className={b('game-img')} src={getSportImgByID(id)} alt={name} />
        </div>
        <span className={b('game-text')}>{name}</span>
      </div>
    </li>
  );
};

GameItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,

  changeActiveGameID: PropTypes.func.isRequired,
};