import React from 'react';
import PT from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import lineSVG from '../../../img/linebetting.svg';
import MainLineEvent from './MainLineEvent';

import './MainLineLine.scss';

const MainLineLine = ({ sports, locale, addToBasket, selectedRates,
  oddType, coefType }) => {
  const b = block('main-line-line');
  const needEvents = sports.map(tempSport => {
    const events = tempSport.tourneys.map(tempTourney => tempTourney.events.flat(1)).flat(1);
    return events.length !== 0 ? events[0] : null;
  }).filter(t => t !== null);
  const eventsList = needEvents.map(tempEvent => (
    <MainLineEvent
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
        <SVGInline svg={lineSVG} className={b('icon').toString()} />
        {locale.topLine}
      </div>
      <div className={b('list')}>
        {eventsList}
      </div>
    </article>
  );
};

MainLineLine.propTypes = {
  locale: PT.object.isRequired,
  sports: PT.array.isRequired,
};

export default MainLineLine;