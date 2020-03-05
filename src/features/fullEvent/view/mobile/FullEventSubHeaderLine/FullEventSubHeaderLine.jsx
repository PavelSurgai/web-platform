import React, { useRef } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { SportBetroute, getBackgroundSportByID } from 'shared/utils/sports';
import FullEventSubHeaderCoef from '../FullEventSubHeaderCoef/FullEventSubHeaderCoef';
import calendar from '../../img/calendar.svg';

import './FullEventSubHeaderLine.scss';

const FullEventSubHeaderLine = ({ teams, score, date,
  serve, locale, teamIdFirst, teamIdSecond, countryID, sportID, sportName, tourneyName, teamNameFirst, teamNameSecond,
  oddType, mainCoefs, addToBasket, selectedRates, statistic, isStatisticOpen }) => {
  const b = block('full-event-subheader-line');
  const sourceFirstImg = `https://pitch90bet.com/media/logo/${teamIdFirst}_${countryID}_${sportID}.png`;
  const sourceSecondImg = `https://pitch90bet.com/media/logo/${teamIdSecond}_${countryID}_${sportID}.png`;
  const checkLength = teamName => teamName.length > 25;
  const coefs = mainCoefs && mainCoefs[0] ? mainCoefs[0].map(coef => <FullEventSubHeaderCoef
    coef={coef}
    addToBasket={addToBasket}
    oddType={oddType}
    isSelect={selectedRates.find(tempRate => tempRate === coef.ID) !== undefined}
  />) : null;
  const backgroundIMG = getBackgroundSportByID(+sportID);
  return (
    <div className={b()}>
      <div className={b('event-header')}>
        
        <div className={b('meta')}>
          <div className={b('score')}>
            {date[1]}
          </div>
          <div className={b('time')}>
            {date[0]}
          </div>
          <div className={b('circle')}>●</div>
        </div>
        
        <div className={b('content')}>
          <div className={b('info')}>
            <div className={b('center-block', { position: 'top' })}>
              <span className={b('teams-name', { small: checkLength(teams.split(' - ')[0]) })}>{teams.split(' - ')[0]}</span>

              <span className={b('teams-name', { small: checkLength(teams.split(' - ')[1]) })}>{teams.split(' - ')[1]}</span>
            </div>
          </div>
        </div>
      
      </div>
      {/* <div className={b('wrapper')}>
        <img className={b('sportImg')} src={backgroundIMG} alt="sport" />
        <div className={b('main-wrapper', { closed: isStatisticOpen })}>
          <div className={b('top-block')}>
            <div className={b('top-block', { position: 'left' })}>{sportName}</div>
            <div className={b('top-block', { position: 'center' })}>{tourneyName}</div>
            <div className={b('top-block', { position: 'right' })} />
          </div>
          <div className={b('center-block')}>

            <div className={b('center-block', { position: 'bottom' })} />
            <div className={b('bottom-block')}>
              {coefs}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

FullEventSubHeaderLine.propTypes = {
  teams: PropTypes.string.isRequired,
  timesScore: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  tourneyName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  serve: PropTypes.string.isRequired,
  comment: PropTypes.string,
  locale: PropTypes.string.isRequired,
  sportName: PropTypes.string.isRequired,
  sportID: PropTypes.number.isRequired,
  teamIdFirst: PropTypes.number.isRequired,
  teamIdSecond: PropTypes.number.isRequired,
  countryID: PropTypes.number.isRequired,
};

export default FullEventSubHeaderLine;
