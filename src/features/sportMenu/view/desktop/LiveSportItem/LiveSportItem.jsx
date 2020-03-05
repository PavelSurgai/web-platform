import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './LiveSportItem.scss';

export const LiveSportItem = ({ text, id, img, color, changeActiveSport, isActive }) => {
  const b = block('live-sport-item');

  return (
    <li className={b({ collapsed: isActive, color })}>
      <Link className={b('sport')} onClick={() => changeActiveSport(id)} to="/live">
        <div className={b('sport-left')}>
          <img className={b('sport-img')} src={img} alt={text} />
        </div>
        <span className={b('sport-text')}>{text}</span>
      </Link>
    </li>
  );
};

LiveSportItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,

  changeActiveSport: PropTypes.func.isRequired,
};