import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { Link } from 'react-router-dom';

import './ResultsEvent.scss';

const ResultsEvent = ({ event }) => {
  const b = block('results-event');
  return (
    <div className={b()}>
      <div className={b('title')}>
        <div className={b('link')}>
          <div className={b('teams')}>
            <div>{event.teamName1}</div>
            {event.teamName2}
          </div>
          <div className={b('date')}>
            <div className={b('date-date')}>{event.date}</div>
            <div className={b('date-time')}>{event.time}</div>
          </div>
          <div className={b('score')} title={event.score}>
            {event.score.substring(0, event.score.indexOf('('))}
            <span className={b('additional-score')}>
              {event.score.substring(event.score.indexOf('('))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

ResultsEvent.propTypes = {
  event: PropTypes.object.isRequired,
};

export default ResultsEvent;