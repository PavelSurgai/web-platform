import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import clock from '../../../img/clock.svg';
import calendar from '../../../img/calendar.svg';
import arrow from '../../../img/arrow.svg';
import EventCoef from './EventCoef/EventCoef';

import './Event.scss';

const Event = ({ event, addToBasket, selectedRates, oddType, locale }) => {
  const b = block('event');
  const mobileBets = event.coefs.filter((temp, index) =>
    (index < 3) && (temp === null || (temp && temp.betslipInfo && temp.betslipInfo.bId < 4)));
  const bets = mobileBets.map((temp, index) => {
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
  });
  const maxStringWidth = ((window.innerWidth / 30)).toFixed(0);
  const firstTeam = event.teams.split(' - ')[0].length <= maxStringWidth ?
    event.teams.split(' - ')[0] :
    `${event.teams.split(' - ')[0].substr(0, maxStringWidth)}...`;
  const secondTeam = event.teams.split(' - ')[1].length <= maxStringWidth ?
    event.teams.split(' - ')[1] :
    `${event.teams.split(' - ')[1].substr(0, maxStringWidth)}...`;

  return (
    <div className={b()}>
      {/* <div className={b('title')}>
        <img
          className={b('icon')}
          onClick={() => addFavoritEvent(event)}
          src={isFavorites ? activeStar : star}
          alt="icon" />
        <Link className={b('link')} to={`/full-event/line/${event.ID}`}>
          <div className={b('teams')}>
            <div className={b('team-name')}>{firstTeam}</div>
            <div className={b('team-name')}>{secondTeam}</div>
          </div>
          <div className={b('date')}>
            <div className={b('date-date')}>{event.eventDate.split(' ')[0]}</div>
            <div className={b('date-time')}>{event.eventDate.split(' ')[1]}</div>
          </div>
        </Link>
      </div>
      {bets} */}
      <div className={b('coefs')}>
        {bets}
      </div>
      <Link className={b('link')} to={`/full-event/line/${event.ID}`}>
        <div className={b('teams')}>
          <div className={b('team-name')}>{firstTeam}</div>
          <div className={b('team-name')}>{secondTeam}</div>
        </div>
        {/* <div className={b('info')}>
          {`${event.sportName} - ${event.tourneyName}`}
        </div> */}
        <div className={b('score')}>
          {/* <SVGInline svg={calendar} className={b('calendar').toString()} /> */}
          <div className={b('date')}>{event.eventDate[1]}</div>
          {/* <SVGInline svg={clock} className={b('clock').toString()} /> */}
          <div className={b('date-time')}>{event.eventDate[0]}</div>
        </div>
      </Link>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
  oddType: PropTypes.string.isRequired,
  addToBasket: PropTypes.func.isRequired,
  selectedRates: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired,
  isFavorites: PropTypes.bool,
  addFavoritEvent: PropTypes.func.isRequired,
};

export default Event;
