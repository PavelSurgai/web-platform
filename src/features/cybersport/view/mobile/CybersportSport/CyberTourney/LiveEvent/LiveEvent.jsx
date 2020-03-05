import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import starSvg from '../../../../img/star.svg';
import arrowSvg from '../../../../img/arrow.svg';
import EventCoef from './EventCoef/EventCoef';

import './LiveEvent.scss';

const LiveEvent = ({ event, addToBasket, selectedRates, oddType }) => {
  const b = block('live-event');
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

  return (
    <div className={b()}>
      <div className={b('title')}>
        <SVGInline className={b('icon').toString()} svg={starSvg} />
        <Link className={b('link')} to={`/full-event/live/${event.ID}`}>
          <div className={b('teams')}>
            <div className={b('teams-row')}>
              {event.teams.split(' - ')[0]}
              <div>{event.score.split(':')[0]}</div>
            </div>
            <div className={b('teams-row')}>
              {event.teams.split(' - ')[1]}
              <div>{event.score.split(':')[1]}</div>
            </div>
          </div>
          <div className={b('date')}>
            <div>{event.score.split(':')[0]}</div>
            {event.score.split(':')[1]}
          </div>
        </Link>
      </div>
      {additionalBet}
      {bets}
      <div className={b('arrow-box')}>
        <SVGInline className={b('arrow-icon').toString()} svg={arrowSvg} />
      </div>
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
