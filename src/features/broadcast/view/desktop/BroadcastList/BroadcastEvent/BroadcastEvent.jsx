import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './BroadcastEvent.scss';

export const BroadcastEvent = ({ event, changeActivePlayer }) => {
  const b = block('broadcast-event');

  const { league, sport, team1Image, team2Image, t1, t2, matchTime } = event;

  const onClick = useCallback(() => changeActivePlayer(event), [event]);

  return (
    <div className={b()} onClick={onClick}>
      <div className={b('header')}>
        {`${sport} - ${league}`}
      </div>
      <div className={b('row')}>
        <div className={b('teams')}>
          <div className={b('team')}>
            <img className={b('team-img')} src={team1Image} alt="" />
            <span className={b('team-name')}>{t1}</span>
          </div>

          <div className={b('team')}>
            <img className={b('team-img')} src={team2Image} alt="" />
            <span className={b('team-name')}>{t2}</span>
          </div>
        </div>

        <div className={b('time')}>
          {matchTime}
        </div>
      </div>
    </div>
  );
};

BroadcastEvent.propTypes = {
  event: PropTypes.object.isRequired,

  changeActivePlayer: PropTypes.func.isRequired,
};