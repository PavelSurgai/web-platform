import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import clock from '../../../../img/clock.svg';
import calendar from '../../../../img/calendar.svg';
import arrow from '../../../../img/arrow.svg';
import EventCoef from './EventCoef/EventCoef';

import './CyberEvent.scss';

const CyberEvent = ({ event, addToBasket, selectedRates, addFavoritEvent, isFavorites, oddType }) => {
  const b = block('cyber-event');
  const mobileBets = event.coefs.filter((temp, index) => (index < 3) && (temp === null || (temp.betslipInfo && temp.betslipInfo.bId < 4)));
  const bets = mobileBets.map((temp, index) => {
    return temp !== null ? <EventCoef
      key={index}
      oddType={oddType}
      coef={temp}
      isActive={false}
      addToBasket={addToBasket}
      isSelect={selectedRates.find(tempRate => tempRate === temp.ID) !== undefined} /> :
    <div key={index} className={b('value-item')}>-</div>;
  });
  const maxStringWidth = ((window.innerWidth / 30) + 6).toFixed(0);
  const firstTeam = event.teams.split(' - ')[0].length <= maxStringWidth ?
    event.teams.split(' - ')[0] :
    `${event.teams.split(' - ')[0].substr(0, maxStringWidth)}...`;
  const secondTeam = event.teams.split(' - ')[1].length <= maxStringWidth ?
    event.teams.split(' - ')[1] :
    `${event.teams.split(' - ')[1].substr(0, maxStringWidth)}...`;

  return (
    <div className={b()}>
      <Link className={b('link')} to={`/full-event/line/${event.ID}`}>
        <div className={b('score')}>
          <SVGInline svg={calendar} className={b('calendar').toString()} />
          <div className={b('date')}>{event.eventDate.split(' ')[0]}</div>
          <SVGInline svg={clock} className={b('clock').toString()} />
          <div className={b('date-time')}>{event.eventDate.split(' ')[1]}</div>
          <div className={b('additional-count')}>{`+${event.additionalBetsCount}`}</div>
          <SVGInline svg={arrow} className={b('arrow').toString()} />
        </div>
        <div className={b('teams')}>
          <span className={b('team-name')}>{event.teams}</span>
        </div>
        <div className={b('info')}>
          {`${event.sportName} - ${event.tourneyName}`}
        </div>
      </Link>
      <div className={b('coefs')}>
        {bets}
      </div>
    </div>
  );
};

CyberEvent.propTypes = {
  oddType: PropTypes.string.isRequired,
  event: PropTypes.object.isRequired,
  addToBasket: PropTypes.func.isRequired,
  addFavoritEvent: PropTypes.func.isRequired,
  selectedRates: PropTypes.array.isRequired,
  isFavorites: PropTypes.bool.isRequired,
};

export default CyberEvent;