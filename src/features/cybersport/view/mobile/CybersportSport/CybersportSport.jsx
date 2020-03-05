import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import { getSportImgByID, getSportColorByID } from 'shared/utils/sports';
import CyberTourney from './CyberTourney';
import './CybersportSport.scss';

const CybersportSport = ({ sport, changeOpenedSport, changeOpenedTourney,
  locale, addToBasket, selectedRates, oddType, addFavoritEvent, favoritesList }) => {
  const b = block('cyber-sport');
  const img = getSportImgByID(sport.ID);
  const color = getSportColorByID(sport.ID);
  const tourneyList = sport.tourneys.map(tempTourney => (
    <CyberTourney
      key={tempTourney.ID}
      tourney={tempTourney}
      countryID={tempTourney.countryID}
      sportID={tempTourney.sportID}
      locale={locale}
      oddType={oddType}
      changeOpenedTourney={changeOpenedTourney}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
      addFavoritEvent={addFavoritEvent}
      favoritesList={favoritesList} />
  ));
  return (
    <div className={b()}>
      <div className={b('header', { color }, { opened: sport.isOpen })} onClick={() => changeOpenedSport(sport.ID)}>
        <div className={b('title')}>
          <img className={b('icon')} src={img} alt="" />
          {sport.name}
        </div>
      </div>
      {sport.isOpen && tourneyList}
    </div>
  );
};

CybersportSport.propTypes = {
  sport: PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    tourneys: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  favoritesList: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object,
    ID: PropTypes.number,
    isActive: PropTypes.bool,
    user: PropTypes.number,
  })).isRequired,
  changeOpenedSport: PropTypes.func.isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  locale: PropTypes.object,
  oddType: PropTypes.string.isRequired,
  selectedRates: PropTypes.array.isRequired,
  addFavoritEvent: PropTypes.func.isRequired,
};


export default CybersportSport;