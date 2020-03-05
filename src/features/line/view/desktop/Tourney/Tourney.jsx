import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import TourneyHeader from './TourneyHeader/TourneyHeader';
import Event from './Event/Event';
import './Tourney.scss';

const Tourney =
  ({ tourney, countryID, sportID, sportName, changeVisibilityEvents, locale, addToBasket,
    selectedRates, addFavoritEvent, favoritesList, oddType }) => {
    const b = block('tourney');
    const eventList = tourney.events.map(temp => (
      <Event
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
        <TourneyHeader
          countryID={countryID}
          sportID={sportID}
          sportName={sportName}
          tourneyName={tourney.tourneyName}
          changeVisibilityEvents={changeVisibilityEvents}
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

Tourney.propTypes = {
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
  changeVisibilityEvents: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  addFavoritEvent: PropTypes.func.isRequired,
  countryID: PropTypes.number.isRequired,
  sportID: PropTypes.number.isRequired,
  locale: PropTypes.object,
  oddType: PropTypes.string.isRequired,
  selectedRates: PropTypes.array.isRequired,
  sportName: PropTypes.string.isRequired,
};


export default Tourney;