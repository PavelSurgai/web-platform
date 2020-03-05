import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import CyberTourneyHeader from './CyberTourneyHeader/CyberTourneyHeader';
import CyberEvent from './CyberEvent/CyberEvent';
import './CyberTourney.scss';

const CyberTourney = ({ tourney, countryID, sportID, changeOpenedTourney, locale, addToBasket, selectedRates, oddType, addFavoritEvent, favoritesList }) => {
  const b = block('cyber-tourney');
  const eventList = tourney.events.map(temp => (
    <CyberEvent
      key={temp.ID}
      event={temp}
      oddType={oddType}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
      addFavoritEvent={addFavoritEvent}
      isFavorites={favoritesList.find(tempFavorit => tempFavorit.data.ID === temp.ID) !== undefined} />
  ));
  return (
    <div className={b()}>
      <CyberTourneyHeader
        countryID={countryID}
        sportID={sportID}
        tourneyName={tourney.tourneyName}
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

CyberTourney.propTypes = {
  tourney: PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    events: PropTypes.array,
    tourneyName: PropTypes.string,
  }).isRequired,
  favoritesList: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object,
    ID: PropTypes.number,
    isActive: PropTypes.bool,
    user: PropTypes.number,
  })).isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  sportID: PropTypes.number.isRequired,
  locale: PropTypes.object,
  oddType: PropTypes.string.isRequired,
  selectedRates: PropTypes.array.isRequired,
  addFavoritEvent: PropTypes.func.isRequired,
};


export default CyberTourney;