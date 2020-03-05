import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import { getSportImgByID, getSportColorByID } from 'shared/utils/sports';
import arrowSvg from '../../../img/arrow.svg';
import CollapseSVG from '../../../img/collapse.svg';
import Tourney from '../../Tourney/Tourney';
import './TourneySport.scss';

const TourneySport = ({ sport, changeOpenedSport, locale,
  addToBasket, selectedRates, changeVisibilityEvents, oddType, favoritesList, addFavoritEvent }) => {
  const b = block('tourney-sport');
  const img = getSportImgByID(sport.ID);
  const color = getSportColorByID(sport.ID);
  const tourneyList = sport.tourneys.map(temp => {
    return (
      <Tourney
        key={temp.ID}
        oddType={oddType}
        tourney={temp}
        sportName={sport.name}
        countryID={temp.events[0].countryID}
        sportID={temp.sportID}
        locale={locale}
        changeVisibilityEvents={changeVisibilityEvents}
        addToBasket={addToBasket}
        selectedRates={selectedRates}
        favoritesList={favoritesList}
        addFavoritEvent={addFavoritEvent} />
    );
  });
  const changeOpenedAllTourneys = () => {
    const isOpen = sport.tourneys.findIndex(t => t.isOpen === false) !== -1;
    sport.tourneys.forEach(t => t.isOpen !== isOpen && changeVisibilityEvents(t.ID));
  };
  const isOpen = sport.tourneys.findIndex(t => t.isOpen === false) !== -1;
  return (
    <div className={b()}>
      <div className={b('header')}>
        <div className={b('title', { color }, { opened: sport.isOpen })} onClick={() => changeOpenedSport(sport.ID)}>
          <img className={b('sport-img')} src={img} alt="" />
          {`${sport.name} (${sport.tourneys.length})`}
          <div className={b('arrow-box')}>
            <SVGInline className={b('arrow-icon', { closed: !sport.isOpen }).toString()} svg={arrowSvg} />
          </div>
        </div>
        <SVGInline
          className={b('collapce', { closed: isOpen }).toString()}
          svg={CollapseSVG}
          onClick={() => changeOpenedAllTourneys(sport.ID)} />
      </div>
      {sport.isOpen && tourneyList}
    </div>
  );
};

TourneySport.propTypes = {
  sport: PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    tourneys: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  locale: PropTypes.object,
  oddType: PropTypes.string.isRequired,
  selectedRates: PropTypes.array.isRequired,
  favoritesList: PropTypes.array.isRequired,

  changeOpenedSport: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  changeVisibilityEvents: PropTypes.func.isRequired,
  addFavoritEvent: PropTypes.func.isRequired,
};


export default TourneySport;