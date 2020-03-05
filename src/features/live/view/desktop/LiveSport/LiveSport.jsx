import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import { getSportImgByID, getSportColorByID } from 'shared/utils/sports';
import arrowSvg from '../../img/arrow.svg';
import CollapseSVG from '../../img/collapse.svg';
import LiveTourney from './LiveTourney';
import './LiveSport.scss';

const LiveSport = ({ sport, changeOpenedSport, changeOpenedTourney, locale, addToBasket, selectedRates, oddType }) => {
  const b = block('live-sport');
  const img = getSportImgByID(sport.ID);
  const color = getSportColorByID(sport.ID);
  const tourneyList = sport.tourneys.map(tempTourney => (
    <LiveTourney
      key={tempTourney.ID}
      tourney={tempTourney}
      countryID={tempTourney.countryID}
      sportID={tempTourney.sportID}
      locale={locale}
      oddType={oddType}
      changeOpenedTourney={changeOpenedTourney}
      addToBasket={addToBasket}
      selectedRates={selectedRates} />
  ));
  const changeOpenedAllTourneys = () => {
    const isOpen = sport.tourneys.findIndex(t => t.isOpen === false) !== -1;
    sport.tourneys.forEach(t => t.isOpen !== isOpen && changeOpenedTourney(t.ID));
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
        <SVGInline className={b('collapce', { closed: isOpen }).toString()} svg={CollapseSVG} onClick={() => changeOpenedAllTourneys(sport.ID)} />
      </div>
      {sport.isOpen && tourneyList}
    </div>
  );
};

LiveSport.propTypes = {
  sport: PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    tourneys: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  changeOpenedSport: PropTypes.func.isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  locale: PropTypes.object,
  oddType: PropTypes.string.isRequired,
  selectedRates: PropTypes.array.isRequired,
};


export default LiveSport;