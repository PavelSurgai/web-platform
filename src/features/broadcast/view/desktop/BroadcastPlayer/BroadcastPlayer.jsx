import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import { BroadcastFramesMenu } from './BroadcastFramesMenu/BroadcastFramesMenu';
import './BroadcastPlayer.scss';

export const BroadcastPlayer = ({ player, onClosePlayer }) => {
  const b = block('broadcast-player');

  const { frames, sport, league, t1, t2, team1Image, team2Image } = player;

  const title = useMemo(
    () => `${sport} - ${league} ${t1} - ${t2}`,
    [sport, league, t1, t2],
  );

  const [activeFrame, changeActiveFrame] = useState(0);

  const activeFrameSrc = useMemo(() => frames[activeFrame], [activeFrame]);

  const onChangeFrame = useCallback(e => {
    changeActiveFrame(+e.currentTarget.dataset.index);
  }, []);

  return (
    <div className={b()}>
      <BroadcastFramesMenu
        frames={frames}
        onItemClick={onChangeFrame}
        onClosePlayer={onClosePlayer}
        activeFrame={activeFrame}
      />
      <div className={b('title')}>
        <span className={b('title-league')}>{`${sport} - ${league}`}</span>
        <div className={b('teams')}>
          <div className={b('team')}>
            <img className={b('team-img')} src={team1Image} alt="" />
            <span className={b('team-name')}>{t1}</span>
          </div>
          {t2 && '-'}
          <div className={b('team')}>
            <span className={b('team-name')}>{t2}</span>
            <img className={b('team-img')} src={team2Image} alt="" />
          </div>
        </div>
      </div>
      <iframe className={b('frame')} src={activeFrameSrc} title={title} />
    </div>
  );
};

BroadcastPlayer.propTypes = {
  player: PropTypes.object.isRequired,

  onClosePlayer: PropTypes.func.isRequired,
};