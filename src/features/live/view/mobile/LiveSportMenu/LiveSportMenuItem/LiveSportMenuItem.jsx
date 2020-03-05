import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import { getSportImgByID } from 'shared/utils/sports';

import './LiveSportMenuItem.scss';

const LiveSportMenuItem = ({ ID, text, callBack, isActive }) => {
  const b = block('live-sport-menu-item');
  const sportImg = useMemo(() => getSportImgByID(ID === 0 ? 1337322 : ID), [ID]);

  return (
    <div className={b({ active: isActive })} onClick={() => callBack(ID)}>
      <div className={b('image-container')}>
        <img className={b('image')} src={sportImg} alt="" />
      </div>
      <span className={b('text')}>{text}</span>
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
