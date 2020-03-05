import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import { getSportImgByID } from 'shared/utils/sports';

import './LiveSportMenuItem.scss';

const LiveSportMenuItem = ({ ID, text, callBack, isActive }) => {
  const b = block('live-sport-menu-item');
  return (
    <div className={b({ active: isActive })} onClick={() => callBack(ID)}>
      <img className={b('image')} src={getSportImgByID(ID)} alt="" />
      <div className={b('text')}>{text}</div>
    </div>
  );
};

LiveSportMenuItem.propTypes = {
  ID: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default LiveSportMenuItem;