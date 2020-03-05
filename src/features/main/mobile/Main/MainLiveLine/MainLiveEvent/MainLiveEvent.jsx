import React from 'react';
import PT from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import { getSportImgByID, getBackgroundSportByID } from 'shared/utils/sports';
import MainLiveEventCoef from './MainLiveEventCoef';
import background from '../../../../img/background.png';
import clockSVG from '../../../../img/clock.svg';

import './MainLiveEvent.scss';

const MainLiveEvent = ({ event, addToBasket, selectedRates, oddType, coefType }) => {
  const b = block('main-live-event');
  const bets = event && event.typedCoefs[coefType] && event.typedCoefs[coefType].map((temp, index) => {
    return temp !== null ? <MainLiveEventCoef
      key={index}
      coef={temp}
      oddType={oddType}
      isSpecial={index === 1}
      isActive={false}
      addToBetslip={f => f}
      addToBasket={addToBasket}
      isSelect={selectedRates.find(tempRate => tempRate === temp.ID) !== undefined} /> :
    <div key={index} className={b('value-item')}>-</div>;
  });
  if (coefType === 'handicap' || coefType === 'total') {
    let size = event.typedCoefs[coefType][0] !== null ? event.typedCoefs[coefType][0].foraSize : undefined;
    if (size === undefined) size = event.typedCoefs[coefType][0] !== null ? event.typedCoefs[coefType][0].totalSize : '-';
    const component = (<div key={2} className={b('value-item')}>{size}</div>);
    bets.splice(1, 0, component);
  }
  return (
    <div className={b()}>
      <div className={b('background')} />
      <div className={b('content')}>
        <Link className={b('top')} to={`/full-event/live/${event.ID}`}>
          <div className={b('sport')}>
            <img src={getSportImgByID(event.sportID)} className={b('sport-icon')} alt="" />
            {event.sportName}
          </div>
          <div className={b('tourney')}>{event.tourneyName}</div>
        </Link>
        <Link className={b('center')} to={`/full-event/live/${event.ID}`}>
          <div className={b('team')}>{event.teams.split(' - ')[0]}</div>
          <div className={b('score-block')}>
            <div className={b('score')}>{event.score}</div>
            <div className={b('line')} />
            <div className={b('time')}>
              <SVGInline svg={clockSVG} className={b('clock').toString()} />
              {event.time || event.comment}
            </div>
          </div>
          <div className={b('team')}>{event.teams.split(' - ')[1]}</div>
        </Link>
        <div className={b('bottom')}>{bets}</div>
      </div>
    </div>
  );
};

MainLiveEvent.propTypes = {
  event: PT.object.isRequired,
  locale: PT.object.isRequired,
};

export default MainLiveEvent;