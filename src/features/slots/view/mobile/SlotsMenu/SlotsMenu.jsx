import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './SlotsMenu.scss';

const SlotsMenu = ({ onMenuClick, isOpenLiveGames, locale }) => {
  const b = block('slots-menu');

  const [prevIsOpen, changePrevIsOpen] = useState(isOpenLiveGames);
  const [animate, changeAnimate] = useState(false);

  useEffect(() => {
    changeAnimate(`${prevIsOpen}-${isOpenLiveGames}`);
    changePrevIsOpen(isOpenLiveGames);
  }, [isOpenLiveGames]);

  return (
    <div className={b()}>
      <div className={b('switcher', { animate })}>
        <div className={b('element', { active: !isOpenLiveGames })} onClick={() => onMenuClick(false)}>
          {locale.slots}
        </div>
        <div className={b('element', { active: isOpenLiveGames })} onClick={() => onMenuClick(true)}>
          {locale.liveCasino}
        </div>
      </div>
    </div>
  );
};

SlotsMenu.propTypes = {
  isOpenLiveGames: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  locale: PropTypes.object,
};


export default SlotsMenu;