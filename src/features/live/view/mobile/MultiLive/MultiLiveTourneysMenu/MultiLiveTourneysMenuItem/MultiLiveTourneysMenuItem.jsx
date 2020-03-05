import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import { getSportImgByID } from 'shared/utils/sports';

import './MultiLiveTourneysMenuItem.scss';

let lastTimer = 0;

const MultiLiveTourneysMenuItem = ({ tourney, callBack, activeSportID, isAnimating, activeEventsID }) => {
  const b = block('multi-live-tourneys-menu-item');
  const events = useRef(null);

  let getZeroPosition = () => {
    return document.getElementById('zeroPoint') ? document.getElementById('zeroPoint').getBoundingClientRect().top : 0;
  }
  let getZeroHeight = () => {
    return document.getElementById('zeroPoint') ? document.getElementById('zeroPoint').offsetHeight : 0;
  }
  let topIndent = getZeroPosition() + getZeroHeight();

  useEffect(() => {
    // events.current.style.transform = 'translateX(0px)';
    if (events.current !== null) {
      events.current.style.top = `${topIndent - 1}px`;
    }
  }, [activeSportID, getZeroPosition()]);

  const [isOpen, changeOpen] = useState(false);

  useEffect(() => {
    if (isAnimating && isOpen) {
      changeOpen(false);
    } else if (!isOpen && lastTimer) {
      clearTimeout(lastTimer);
    } else if (isOpen) {
      lastTimer = setTimeout(() => changeOpen(false), 2500);
    }
  }, [isOpen, isAnimating]);

  const eventList = tourney.events.map(temp => <div key={temp.ID} className={b('item', { active: activeEventsID.findIndex(t => t === temp.ID) !== -1 })} onClick={() => { changeOpen(false); callBack(temp.ID); }}>
    <div className={b('teams')}>
      <div>{temp.teams.substring(0, temp.teams.indexOf(' - '))}</div>
      {temp.teams.substring(temp.teams.indexOf(' - ') + 3)}
    </div>
    <div className={b('score')}>
      <div>{temp.score}</div>
      {temp.time}
    </div>
  </div>);
  return (
    <div className={b()} title={tourney.name} onClick={() => changeOpen(!isOpen)}>
      <div className={b('header')} id='zeroPoint'>
        <img className={b('image')} src={getSportImgByID(tourney.sportID)} alt="" />
        <div className={b('name')} >{tourney.name}</div>
        <div className={b('count')}>{tourney.events.length}</div>
      </div>
      <div className={b('events', { open: !isAnimating && isOpen })} ref={events} >
        {eventList}
      </div>
    </div>
  );
};

MultiLiveTourneysMenuItem.propTypes = {
  isAnimating: PropTypes.bool.isRequired,
  activeSportID: PropTypes.number.isRequired,
  callBack: PropTypes.func.isRequired,
  tourney: PropTypes.object.isRequired,
  activeEventsID: PropTypes.array.isRequired,
};

export default MultiLiveTourneysMenuItem;