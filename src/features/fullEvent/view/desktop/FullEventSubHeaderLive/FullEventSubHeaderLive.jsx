import React, { useRef } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import sportBackgrounds from '../../img/sportBackgrounds/desktop';

import './FullEventSubHeaderLive.scss';

const FullEventSubHeaderLive = ({ teams, score, sportID, timesScore, time,
  comment, serve, countryID, locale, teamIdFirst, teamIdSecond }) => {
  const b = block('full-event-subheader-live');
  const image = sportBackgrounds[sportID] ? sportBackgrounds[sportID] : sportBackgrounds.default;
  const sourceFirstImg = `https://pitch90bet.com/media/logo/${teamIdFirst}_${countryID}_${sportID}.png`;
  const sourceSecondImg = `https://pitch90bet.com/media/logo/${teamIdSecond}_${countryID}_${sportID}.png`;
  const imgRefFirst = useRef(null);
  const imgRefSecond = useRef(null);
  const isHockey = sportID === 6;
  return (
    <div className={b()}>
      <img src={image} alt="" className={b('background', { black: isHockey })} />
      <div className={b('content')}>
        <div className={b('main')}>
          <div className={b('left')} title={teams.split(' - ')[0]}>
            <div className={b('logo-wrapper', { type: 'first' })}>
              <img ref={imgRefFirst}
                src={sourceFirstImg}
                onError={() => { imgRefFirst.current.style.display = 'none'; }}
                alt=""
              />
            </div>
            {teams.split(' - ')[0]}
          </div>
          <div className={b('center')}>
            <div className={b('score')}>
              {score}
            </div>
          </div>
          <div className={b('right')} title={teams.split(' - ')[0]}>
            {teams.split(' - ')[1]}
            <div className={b('logo-wrapper', { type: 'second' })}>
              <img ref={imgRefSecond}
                src={sourceSecondImg}
                onError={() => { imgRefSecond.current.style.display = 'none'; }}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className={b('time')}>
          {`${time} ${comment}`}
        </div>
        {serve && <div className={b('serve')}>{`${locale}: ${serve}`}</div>}
        <div className={b('times-score')}>
          {timesScore}
        </div>
      </div>
    </div>
  );
};

FullEventSubHeaderLive.propTypes = {
  teams: PropTypes.string.isRequired,
  sportID: PropTypes.number.isRequired,
  timesScore: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  serve: PropTypes.string,
  comment: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default FullEventSubHeaderLive;
