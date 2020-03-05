import React, { useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import ResultsTourneyHeader from './ResultsTourneyHeader/ResultsTourneyHeader';
import ResultsEvent from './ResultsEvent/ResultsEvent';
import './ResultsTourney.scss';

export const ResultsTourney = ({ tourney, locale }) => {
  const b = block('results-tourney');
  const [isOpen, changeOpen] = useState(true);
  const eventList = tourney.events.map(temp => (
    <ResultsEvent
      key={temp.ID}
      event={temp} />
  ));
  return (
    <div className={b()}>
      <ResultsTourneyHeader
        key={tourney.ID}
        sportID={tourney.sportID}
        name={tourney.name}
        locale={locale}
        isOpen={isOpen}
        changeOpen={changeOpen} />
      {isOpen && (
        <div className={b('events')}>
          {eventList}
        </div>
      )}
    </div>
  );
};

ResultsTourney.propTypes = {
  tourney: PropTypes.shape({
    isOpen: PropTypes.bool,
    events: PropTypes.array,
    tourneyName: PropTypes.string,
    sportID: PropTypes.number,
    tourneyID: PropTypes.number,
  }).isRequired,
  locale: PropTypes.object,
};