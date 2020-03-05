import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import LiveTourneyHeader from './LiveTourneyHeader/LiveTourneyHeader';
import LiveEvent from './LiveEvent/LiveEvent';
import './LiveTourney.scss';

const LiveTourney = ({ tourney, countryID, sportID, changeOpenedTourney, locale, addToBasket, selectedRates, oddType }) => {
  const b = block('live-tourney');
  const eventList = tourney.events.map(temp => (
    <LiveEvent key={temp.ID} event={temp} oddType={oddType} addToBasket={addToBasket} selectedRates={selectedRates} />
  ));
  return (
    <div className={b()}>
      <LiveTourneyHeader
        countryID={countryID}
        sportID={sportID}
        tourneyName={tourney.name}
        changeOpenedTourney={changeOpenedTourney}
        locale={locale}
        isOpen={tourney.isOpen}
        tourneyID={tourney.ID} />
      {tourney.isOpen && (
        <div className={b('events')}>
          {eventList}
        </div>
      )}
    </div>
  );
};

LiveTourney.propTypes = {
  tourney: PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    events: PropTypes.array,
    tourneyName: PropTypes.string,
  }).isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  countryID: PropTypes.number.isRequired,
  sportID: PropTypes.number.isRequired,
  locale: PropTypes.object,
  oddType: PropTypes.string.isRequired,
  selectedRates: PropTypes.array.isRequired,
};


export default LiveTourney;