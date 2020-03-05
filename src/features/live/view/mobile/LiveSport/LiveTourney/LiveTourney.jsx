import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import LiveTourneySubHeader from './LiveTourneySubHeader';
import LiveTourneyHeader from './LiveTourneyHeader/LiveTourneyHeader';
import LiveEvent from './LiveEvent/LiveEvent';
import './LiveTourney.scss';

const LiveTourney = ({ tourney, countryID, sportID, changeOpenedTourney, locale,
  addToBasket, selectedRates, oddType, coefType }) => {
  const b = block('live-tourney');
  const eventList = useMemo(() => tourney.events.map(temp => (
    <LiveEvent
      key={temp.ID}
      event={temp}
      locale={locale}
      coefType={coefType}
      oddType={oddType}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
    />
  )), [addToBasket, coefType, locale, oddType, selectedRates, tourney.events]);

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
        <React.Fragment>
          <LiveTourneySubHeader locale={locale} />
          <div className={b('events')}>
            {eventList}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

LiveTourney.propTypes = {
  tourney: PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    events: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  countryID: PropTypes.number.isRequired,
  sportID: PropTypes.number.isRequired,
  locale: PropTypes.object,
  oddType: PropTypes.string.isRequired,
  coefType: PropTypes.string.isRequired,
  selectedRates: PropTypes.array.isRequired,
};


export default LiveTourney;