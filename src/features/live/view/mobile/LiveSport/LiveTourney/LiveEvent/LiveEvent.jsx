import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import clock from '../../../../img/clock.svg';

import EventCoef from './EventCoef/EventCoef';

import './LiveEvent.scss';

const LiveEvent = ({ event, addToBasket, selectedRates, oddType, coefType, locale }) => {
  const b = block('live-event');
  const bets = useMemo(() => event && event.typedCoefs[coefType] && event.typedCoefs[coefType].map((temp, index) => {
    return temp !== null ? <EventCoef
      key={index}
      coef={temp}
      locale={locale}
      oddType={oddType}
      isSpecial={index === 1}
      isActive={false}
      addToBetslip={f => f}
      addToBasket={addToBasket}
      isSelect={selectedRates.find(tempRate => tempRate === temp.ID) !== undefined} /> :
      <div key={index} className={b('value-item')}>-</div>;
  }), [addToBasket, b, coefType, event, locale, oddType, selectedRates]);
  // const shortNames = useMemo(() => locale.betShortName.map(t => (
  //   <div className={b('short-name')}>{t}</div>
  // )), [b, locale]);

  if (coefType === 'handicap' || coefType === 'total') {
    let size = event.typedCoefs[coefType][0] !== null ? event.typedCoefs[coefType][0].foraSize : undefined;
    if (size === undefined) size = event.typedCoefs[coefType][0] !== null ? event.typedCoefs[coefType][0].totalSize : '-';
    const component = (<div key={2} className={b('value-item')}>{size}</div>);
    bets.splice(1, 0, component);
  }
  const firstTeam = event.teams.split(' - ')[0];
  const secondTeam = event.teams.split(' - ')[1];

  return (
    <div className={b('info')}>
      <div className={b('eventName')}>
        {`${event.sportName} - ${event.tourneyName}`}
      </div>
      <div className={b()}>
        <Link className={b('link')} to={`/full-event/live/${event.ID}`}>
          <div className={b('teams')}>
            <span className={b('team-name')}>{firstTeam}</span>
            <span className={b('team-name')}>{secondTeam}</span>
          </div>
          <div className={b('date')}>{event.time || event.comment}</div>
          <div className={b('score')}>
            <div className={b('score-value')}>
              <div>{event.score.split(':')[0]}</div>
              <div>{event.score.split(':')[1]}</div>
            </div>
          </div>
        </Link>
        <div className={b('coefs')}>
          {bets}
        </div>
      </div>
    </div>
  );
};

LiveEvent.propTypes = {
  event: PropTypes.object.isRequired,
  oddType: PropTypes.string.isRequired,
  coefType: PropTypes.string.isRequired,
  addToBasket: PropTypes.func.isRequired,
  selectedRates: PropTypes.array.isRequired,
  locale: PropTypes.object,
};

export default React.memo(LiveEvent);
