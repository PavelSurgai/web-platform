import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import { getSportImgByID, getSportColorByID } from 'shared/utils/sports';
import LiveTourneySubHeader from './LiveTourney/LiveTourneySubHeader';
import LiveEvent from './LiveTourney/LiveEvent/LiveEvent';
import arrowSvg from '../../img/arrow.svg';
import './LiveSport.scss';

const LiveSport = ({ sport, changeOpenedSport, addToBasket, selectedRates, oddType, coefType, locale }) => {
  const b = block('live-sport');
  const img = useMemo(() => getSportImgByID(sport.ID), [sport.ID]);
  const color = useMemo(() => getSportColorByID(sport.ID), [sport.ID]);
  const eventList = useMemo(() => sport.tourneys.map(t => t.events).flat().map(temp => (
    <LiveEvent
      key={temp.ID}
      event={temp}
      locale={locale}
      coefType={coefType}
      oddType={oddType}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
    />
  )), [addToBasket, coefType, locale, oddType, selectedRates, sport.tourneys]);

  const onHeaderClick = useCallback(() => changeOpenedSport(sport.ID), [sport.ID, changeOpenedSport]);

  return (
    <div className={b()}>
      <div className={b('header', { color }, { opened: sport.isOpen })} onClick={onHeaderClick}>
        <div className={b('title')}>
          <div className={b('title', { position: 'left' })}>
            <img src={img} className={b('icon')} alt="" />
            {sport.name}
          </div>
          <SVGInline svg={arrowSvg} className={b('arrow', { closed: !sport.isOpen })} />
        </div>
      </div>
      {sport.isOpen && (
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

LiveSport.propTypes = {
  sport: PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    tourneys: PropTypes.array,
    name: PropTypes.string,
  }).isRequired,
  oddType: PropTypes.string.isRequired,
  coefType: PropTypes.string.isRequired,
  locale: PropTypes.object,
  selectedRates: PropTypes.array.isRequired,

  changeOpenedSport: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
};


export default React.memo(LiveSport);