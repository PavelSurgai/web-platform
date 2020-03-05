import React from 'react';
import PT from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import liveSVG from '../../../img/livebetting.svg';
import MainLiveEvent from './MainLiveEvent';

import './MainLiveLine.scss';

const MainLiveLine = ({ sports, locale, addToBasket, selectedRates,
  oddType, coefType }) => {
  const b = block('main-live-line');
  const needEvents = sports.map(tempSport => {
    const events = tempSport.tourneys.map(tempTourney => tempTourney.events.flat(1)).flat(1);
    return events.length !== 0 ? events[0] : null;
  }).filter(t => t !== 0);
  const eventsList = needEvents.map(tempEvent => (
    <MainLiveEvent
      key={tempEvent.ID}
      event={tempEvent}
      locale={locale}
      addToBasket={addToBasket}
      selectedRates={selectedRates}
      oddType={oddType}
      coefType={coefType}
    />
  ));
  return (
    <article className={b()}>
      <div className={b('header')}>
        <SVGInline svg={liveSVG} className={b('icon').toString()} />
        {locale.topLive}
      </div>
      <div className={b('list')}>
        {eventsList}
      </div>
    </article>
  );
};

MainLiveLine.propTypes = {
  locale: PT.object.isRequired,
  sports: PT.array.isRequired,
};

export default MainLiveLine;