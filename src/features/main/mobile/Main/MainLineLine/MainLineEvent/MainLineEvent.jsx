import React from 'react';
import PT from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import { getSportImgByID, getBackgroundSportByID } from 'shared/utils/sports';
import MainLineEventCoef from './MainLineEventCoef';
import background from '../../../../img/background.png';
import clockSVG from '../../../../img/clock.svg';

import './MainLineEvent.scss';

const MainLineEvent = ({ event, addToBasket, selectedRates,
  oddType, coefType }) => {
  const b = block('main-line-event');
  const bets = event.coefs.map((temp, index) => {
    return temp !== null ? <MainLineEventCoef
      key={index}
      coef={temp}
      oddType={oddType}
      isSpecial={index === 1}
      isActive={false}
      addToBetslip={f => f}
      addToBasket={addToBasket}
      isSelect={selectedRates.find(tempRate => tempRate === temp.ID) !== undefined} /> :
    <div key={index} className={b('value-item')}>-</div>;
  }).filter((t, i) => i < 3);
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
        <Link className={b('top')} to={`/full-event/line/${event.ID}`}>
          <div className={b('sport')}>
            <img src={getSportImgByID(event.sportID)} className={b('sport-icon')} alt="" />
            {event.sportName}
          </div>
          <div className={b('tourney')}>{event.tourneyName}</div>
        </Link>
        <Link className={b('center')} to={`/full-event/line/${event.ID}`}>
          <div className={b('team')}>{event.teams.split(' - ')[0]}</div>
          <div className={b('score-block')}>
            <div className={b('score')}>{event.eventDate[0]}</div>
            <div className={b('line')} />
            <div className={b('time')}>
              <SVGInline svg={clockSVG} className={b('clock').toString()} />
              {event.eventDate[1]}
            </div>
          </div>
          <div className={b('team')}>{event.teams.split(' - ')[1]}</div>
        </Link>
        <div className={b('bottom')}>{bets}</div>
      </div>
    </div>
  );
};

MainLineEvent.propTypes = {
  event: PT.object.isRequired,
  locale: PT.object.isRequired,
};

export default MainLineEvent;