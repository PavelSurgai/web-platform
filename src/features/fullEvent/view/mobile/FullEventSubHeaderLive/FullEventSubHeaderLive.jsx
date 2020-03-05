import React, { useRef, useMemo } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { modifyScore, modifyTime } from 'features/fullEvent/data/modifyScore';

import FullEventSubHeaderCoef from '../FullEventSubHeaderCoef/FullEventSubHeaderCoef';
import TimeSVG from '../../img/time.svg';
import FullEventStatisticBLock from './FullEventStatisticBLock';
import { getBackgroundSportByID } from 'shared/utils/sports';

import './FullEventSubHeaderLive.scss';

const FullEventSubHeaderLive = ({ teams, score, timesScore, time, comment,
  serve, locale, teamIdFirst, teamIdSecond, countryID, sportID, sportName, tourneyName, teamNameFirst, teamNameSecond,
  oddType, mainCoefs, addToBasket, selectedRates, statistic, isStatisticOpen }) => {
  let isModified = sportID === 3;
  const modifiedScore = sportID === 3 ? modifyScore(statistic) : score;
  const modifiedTime = sportID === 3 ? modifyTime(statistic, score) : time;
  const b = block('full-event-subheader-live');
  const sourceFirstImg = `https://pitch90bet.com/media/logo/${teamIdFirst}_${countryID}_${sportID}.png`;
  const sourceSecondImg = `https://pitch90bet.com/media/logo/${teamIdSecond}_${countryID}_${sportID}.png`;
  const checkLength = teamName => teamName.length > 25;
  const ceberStatisticBlock = sportID === 300 || sportID === 264 ? <FullEventStatisticBLock
    statisticList={[{ name: score, value: [score.split(':')[0], score.split(':')[1]] }]}
    sportName={sportName}
    tourneyName={tourneyName}
    sportID={sportID} /> : null;
  const coefs = mainCoefs && mainCoefs[0] ? mainCoefs[0].map(coef => <FullEventSubHeaderCoef
    coef={coef}
    addToBasket={addToBasket}
    oddType={oddType}
    isSelect={selectedRates.find(tempRate => tempRate === coef.ID) !== undefined}
  />) : null;
  const backgroundIMG = getBackgroundSportByID(+sportID);
  return (
    <div className={b()}>
      <div className={b('wrapper')}>
        <div className={b('sportBackground')} />
        <div className={b('main-wrapper', { closed: isStatisticOpen })}>
          <div className={b('top-block')}>
            <div className={b('top-block', { position: 'left' })}>{sportName}</div>
            <div className={b('top-block', { position: 'center' })}>{tourneyName}</div>
            <div className={b('top-block', { position: 'right' })} />
          </div>
          <div className={b('center-block')}>
            <div className={b('center-block', { position: 'top' })}>
              <span className={b('teams-name', { small: checkLength(teams.split(' - ')[0]) })}>{teams.split(' - ')[0]}</span>
              <div className={b('score')}>
                {modifiedScore}
              </div>
              <span className={b('teams-name', { small: checkLength(teams.split(' - ')[1]) })}>{teams.split(' - ')[1]}</span>
            </div>
            <div className={b('center-block', { position: 'bottom' })}>
              <div className={b('serve')}>{serve === teamNameFirst && locale.serve}</div>
              <div className={b('center-bottom-block')}>
                {!isModified && <span className={b('times-score')}>{timesScore}</span>}
                <div className={b('time')}>
                  {!isModified && <SVGInline svg={TimeSVG} className={b('time-icon')} />}
                  {modifiedTime || comment}
                </div>

              </div>
              <div className={b('serve')}>{serve === teamNameSecond && locale.serve}</div>
            </div>
          </div>
        </div>
        <div className={b('statistic-wrapper', { opened: isStatisticOpen })}>
          {ceberStatisticBlock}
          <FullEventStatisticBLock
            statisticList={statistic}
            sportID={sportID}
            sportName={sportName}
            tourneyName={tourneyName}
            time={time}
            comment={comment}
            sourceFirstImg={sourceFirstImg}
            sourceSecondImg={sourceSecondImg}
            teamNameFirst={teamNameFirst}
            teamNameSecond={teamNameSecond}
            coefs={coefs}
          />
        </div>
        {/* {time && <div className={b('time')}>{time}</div>}
      {comment && <div className={b('time')}>{comment}</div>}
      {serve && <div className={b('serve')}>{`${locale}: ${serve}`}</div>}
      <div className={b('times-score')}>
        {timesScore}
      </div>
      <div className={b('main')}>
        <div className={b('left')}>
          <div className={b('logo-wrapper', { type: 'first' })}>
            <img ref={imgRefFirst}
              className={b('img')}
              src={sourceFirstImg}
              onError={() => { imgRefFirst.current.style.display = 'none'; }}
              alt=""
            />

          </div>
          <span className={b('teams-name', { small: checkLength(teams.split(' - ')[0]) })}>{teams.split(' - ')[0]}</span>
        </div>
        <div className={b('center')}>
          <div className={b('score')}>
            {score}
          </div>
        </div>
        <div className={b('right')}>
          <div className={b('logo-wrapper', { type: 'second' })}>
            <img ref={imgRefSecond}
              className={b('img')}
              src={sourceSecondImg}
              onError={() => { imgRefSecond.current.style.display = 'none'; }}
              alt=""
            />

          </div>
          <span className={b('teams-name', { small: checkLength(teams.split(' - ')[1]) })}>{teams.split(' - ')[1]}</span>
        </div>
      </div> */}
      </div>
    </div>
  );
};

FullEventSubHeaderLive.propTypes = {
  teams: PropTypes.string.isRequired,
  timesScore: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  tourneyName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  serve: PropTypes.string.isRequired,
  comment: PropTypes.string,
  locale: PropTypes.string.isRequired,
  oddType: PropTypes.string.isRequired,
  teamNameFirst: PropTypes.string.isRequired,
  teamNameSecond: PropTypes.string.isRequired,
  sportName: PropTypes.string.isRequired,
  sportID: PropTypes.number.isRequired,
  teamIdFirst: PropTypes.number.isRequired,
  teamIdSecond: PropTypes.number.isRequired,
  countryID: PropTypes.number.isRequired,
};

export default FullEventSubHeaderLive;
