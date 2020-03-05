import React from 'react';
import PT from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import { getSlotImage } from 'shared/utils/slots/outcome';

import { gameList as outcomeGameList, sectionList } from 'features/slots/outcome/data';

import slotsSVG from '../../../img/slots.svg';

import './MainSlotsLine.scss';

const MainSlotsLine = ({ slots, locale, gameList, onSlotClick }) => {
  const b = block('main-slots-line');
  const list = gameList.length ? gameList : outcomeGameList;
  const needSlots = list.filter((v, i, a) => a.findIndex(t => t.sectionId === v.sectionId) === i)
    .map(temp => <img
      className={b('slot')}
      src={getSlotImage(temp.id, temp.sectionId)}
      alt="slot"
      onClick={e => onSlotClick(e, temp.id)} />);
  return (
    <article className={b()}>
      <div className={b('header')}>
        <SVGInline svg={slotsSVG} className={b('icon').toString()} />
        {locale.slots}
      </div>
      <div className={b('list')}>
        {needSlots}
      </div>
    </article>
  );
};

MainSlotsLine.propTypes = {
  locale: PT.object.isRequired,
  slots: PT.array.isRequired,
  gameList: PT.array.isRequired,
};

export default MainSlotsLine;