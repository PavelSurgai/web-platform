import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import TourneyHeader from './TourneyHeader/TourneyHeader';
import Event from './Event/Event';
import './Tourney.scss';

const Tourney = props => {
  const b = block('tourney');
  const { tourney, countryID, sportID,
    changeVisibilityEvents, locale, addToBasket,
    selectedRates, oddType, addFavoritEvent,
    favoritesList, isFavorites = false } = props;
  const eventList = tourney.events.map(temp => (
    <Event
      key={temp.ID}
      event={temp}
      oddType={oddType}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
      locale={locale}
      addFavoritEvent={addFavoritEvent}
      isFavorites={favoritesList.find(tempFavorit => tempFavorit.data.ID === temp.ID) !== undefined} />
  ));
  const shortNames = useMemo(() => locale.betShortName.map(t => (
    <div className={b('short-name')}>{t}</div>
  )), [b, locale]);
  return (
    <div className={b()}>
      <TourneyHeader
        countryID={countryID}
        sportID={sportID}
        tourneyName={tourney.tourneyName}
        changeVisibilityEvents={changeVisibilityEvents}
        locale={locale}
        isOpen={tourney.isOpen}
        tourneyID={tourney.ID}
        isFavorites={isFavorites} />
      {tourney.isOpen && (
        <div className={b('events')}>
          <div className={b('top-block')}>
            {shortNames}
          </div>
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
  changeVisibilityEvents: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  countryID: PropTypes.number.isRequired,
  events: PropTypes.object.isRequired,
  sportID: PropTypes.number.isRequired,
  locale: PropTypes.object,
  oddType: PropTypes.string.isRequired,
  selectedRates: PropTypes.array.isRequired,
  favoritesList: PropTypes.array.isRequired,
  isFavorites: PropTypes.bool,

  addFavoritEvent: PropTypes.func.isRequired,
};


export default Tourney;
