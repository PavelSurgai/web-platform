import React, { useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import { servSportIcons } from 'shared/utils/servingSport';

import { FullEventLive } from 'features/fullEvent/desktop';
import arrowSvg from '../../../../img/arrow.svg';
import EventCoef from './EventCoef/EventCoef';

import './LiveEvent.scss';

const LiveEvent = ({ event, addToBasket, selectedRates, oddType }) => {
  const b = block('live-event');
  const [isOpen, changeOpen] = useState(false);

  const additionalBet = (<Link
    className={b('value-item', { type: 'additional' })}
    to={`/full-event/live/${event.ID}`}>
    {`+${event.additionalBetsCount}`}
  </Link>);
  const bets = event.coefs.map((temp, index) => {
    return temp !== null ? <EventCoef
      key={index}
      coef={temp}
      oddType={oddType}
      isActive={false}
      addToBasket={addToBasket}
      isSelect={selectedRates.find(tempRate => tempRate === temp.ID) !== undefined} /> :
    <div key={index} className={b('value-item')}>-</div>;
  });
  const foraSize = event.coefs[7] ? event.coefs[7].foraSize : '-';
  const totalSize = event.coefs[9] ? event.coefs[9].totalSize : '-';

  bets.splice(7, 0, (<div key={228} className={b('value-item')}>{foraSize}</div>));
  bets.splice(10, 0, (<div key={229} className={b('value-item')}>{totalSize}</div>));

  const serveIcon = (
    <img className={b('serv-icon')} src={servSportIcons[event.sportID] || servSportIcons.default} alt="" />
  );

  return (
    <div className={b('wrapper')}>
      <div className={b({ open: isOpen })}>
        <div className={b('title')}>
          <Link className={b('link')} to={`/full-event/live/${event.ID}`}>
            <div className={b('teams')}>
              <div className={b('teams-row')}>
                <div className={b('team-name')} title={event.teams.split(' - ')[0]}>{event.teams.split(' - ')[0]}</div>
                <div className={b('team-score')}>{event.score.split(':')[0]}</div>
                <div className={b('team-serve')}>{event.servingTeam === 1 && serveIcon}</div>
              </div>
              <div className={b('teams-row')}>
                <div className={b('team-name')} title={event.teams.split(' - ')[1]}>{event.teams.split(' - ')[1]}</div>
                <div className={b('team-score')}>{event.score.split(':')[1]}</div>
                <div className={b('team-serve')}>{event.servingTeam === 2 && serveIcon}</div>
              </div>
            </div>
            <span className={b('time')}>{event.time || event.comment}</span>
          </Link>
        </div>
        {additionalBet}
        {bets}
        <div className={b('arrow-box')} onClick={() => changeOpen(!isOpen)}>
          <SVGInline className={b('arrow-icon').toString()} svg={arrowSvg} />
        </div>
      </div>
      {isOpen && <FullEventLive eventID={event.ID} inLine />}
    </div>
  );
};

LiveEvent.propTypes = {
  event: PropTypes.object.isRequired,
  oddType: PropTypes.string.isRequired,
  addToBasket: PropTypes.func.isRequired,
  selectedRates: PropTypes.array.isRequired,
};

export default LiveEvent;
