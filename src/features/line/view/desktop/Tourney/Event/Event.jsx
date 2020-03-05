import React, { useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import { FullEventLine } from 'features/fullEvent/desktop';
import starSvg from '../../../img/star.svg';
import activeStarSvg from '../../../img/active-star.svg';
import arrowSvg from '../../../img/arrow.svg';
import EventCoef from './EventCoef/EventCoef';

import './Event.scss';

const Event = ({ event, addToBasket, selectedRates, addFavoritEvent, isFavorites, oddType }) => {
  const b = block('event');

  const [isOpen, changeOpen] = useState(false);

  const additionalBet = (<Link
    className={b('value-item', { type: 'additional' })}
    to={`/full-event/line/${event.ID}`}>
    {`+${event.additionalBetsCount}`}
  </Link>);
  const bets = event.coefs.map((temp, index) => {
    return temp !== null ? <EventCoef
      key={index}
      oddType={oddType}
      coef={temp}
      isActive={false}
      addToBasket={addToBasket}
      isSelect={selectedRates.find(tempRate => tempRate === temp.ID) !== undefined} /> :
    <div key={index} className={b('value-item')}>-</div>;
  });
  const foraSize = event.coefs[7] ? event.coefs[7].foraSize : '-';
  const totalSize = event.coefs[9] ? event.coefs[9].totalSize : '-';

  bets.splice(7, 0, (<div key={228} className={b('value-item')}>{foraSize}</div>));
  bets.splice(10, 0, (<div key={229} className={b('value-item')}>{totalSize}</div>));
  return (
    <div className={b('wrapper')}>
      <div className={b({ open: isOpen })}>
        <div className={b('title')}>
          <SVGInline className={b('icon').toString()} svg={isFavorites ? activeStarSvg : starSvg} onClick={() => addFavoritEvent(event)} />
          <Link className={b('link')} to={`/full-event/line/${event.ID}`}>
            <div className={b('teams')}>
              <div>{event.teams.split(' - ')[0]}</div>
              {event.teams.split(' - ')[1]}
            </div>
            <div className={b('score')}>
              <div className={b('date-date')}>{event.eventDate[1]}</div>
              <div className={b('date-time')}>{event.eventDate[0]}</div>
            </div>
          </Link>
        </div>
        {additionalBet}
        {bets}
        <div className={b('arrow-box')} onClick={() => changeOpen(!isOpen)}>
          <SVGInline className={b('arrow-icon').toString()} svg={arrowSvg} />
        </div>
      </div>
      {isOpen && <FullEventLine inLine eventID={event.ID} />}
    </div>
  );
};

Event.propTypes = {
  oddType: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  addToBasket: PropTypes.func.isRequired,
  addFavoritEvent: PropTypes.func.isRequired,
  selectedRates: PropTypes.array.isRequired,
  isFavorites: PropTypes.bool.isRequired,
};

export default Event;