import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import BackBlock from 'components/BackBlock/mobile';

import collapseIcon from '../../img/collapse.svg';
import ZoneSvg from '../../img/zone.svg';

import './FullEventBackBlock.scss';

const FullEventBackBlock = ({ tourneyName, changeVisibleAllGroups, locale, isLive = false,
  isStatisticOpen, onSwitchStatisticVisibility, isCollapsed, changeVisibleMapAttack, isOpenMapAttack, mapId }) => {
  const b = block('full-event-back-block');
  const [visible, setVisible] = useState(false);

  const changeVisible = () => {
    changeVisibleAllGroups(visible);
    setVisible(!visible);
  };

  return (
    <BackBlock>
      <span className={b('tourney-name')}>{locale.aboutMatch}</span>
      <div className={b('right-block')}>
        {isLive &&
          <div className={b('statistic-button', { active: isStatisticOpen })} onClick={onSwitchStatisticVisibility}>
            {locale.statistic}
          </div>
        }
        {isLive && mapId && <div className={b('map-block', { opened: isOpenMapAttack })} onClick={changeVisibleMapAttack}>
          <SVGInline svg={ZoneSvg} className={b('map-button', { active: isOpenMapAttack })} />
        </div>}
      </div>
    </BackBlock>
  );
};

FullEventBackBlock.propTypes = {
  locale: PropTypes.object.isRequired,
  tourneyName: PropTypes.string.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  isOpenMapAttack: PropTypes.bool,
  isStatisticOpen: PropTypes.bool,
  isLive: PropTypes.bool,
  mapId: PropTypes.string,

  changeVisibleAllGroups: PropTypes.func.isRequired,
  changeVisibleMapAttack: PropTypes.func,
  onSwitchStatisticVisibility: PropTypes.func,
};

export default FullEventBackBlock;
