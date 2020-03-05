import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import arrowSvg from 'features/live/view/img/arrowMenu.svg';
import MultiLiveTourneysMenuItem from './MultiLiveTourneysMenuItem';

import './MultiLiveTourneysMenu.scss';

const MultiLiveTourneysMenu = ({ tourneysList, callBack, activeSportID, innerRef, activeEventsID }) => {
  const items = useRef(null);
  const [itemsWidth, onChangeItemsWidth] = useState(null);
  const [isAnimating, setAnimatingCondition] = useState(false);
  useEffect(() => {
    items.current.scrollLeft = 0;
  }, [activeSportID]);

  useEffect(() => {
    if (innerRef.current !== null) {
      innerRef.current.addEventListener('touchstart', () => {
        if (!isAnimating) setAnimatingCondition(true);
      });
      innerRef.current.addEventListener('touchend', () => {
        setAnimatingCondition(false);
      });
    }
  }, []);

  useEffect(() => {
    onChangeItemsWidth(() => items.current.clientWidth);
  });

  const scroll = (e, direction) => {
    setAnimatingCondition(true);
    let previousScroll = -1;
    const itemsBlock = e.currentTarget.parentNode.querySelector('.multi-live-tourneys-menu__items');
    const eventsBlock = e.currentTarget.parentNode.querySelectorAll('.multi-live-tourneys-menu-item__events');
    itemsBlock.scrollTo({
      left: itemsBlock.scrollLeft + (direction * items.current.clientWidth),
      behavior: 'smooth',
    });
    const trueDiretion = direction < 1 ? 1 : -1;
    const iterator = i => {
      for (let j = 0; j < eventsBlock.length; j += 1) {
        eventsBlock[j].style.transform = `translateX(${direction * trueDiretion * itemsBlock.scrollLeft}px)`;
      }
      if (i < itemsWidth && previousScroll !== itemsBlock.scrollLeft) {
        setTimeout(() => iterator(i + 1), 50);
      } else {
        setAnimatingCondition(false);
      }
      previousScroll = itemsBlock.scrollLeft;
    };
    iterator(0);
  };

  const b = block('multi-live-tourneys-menu');

  const itemList = tourneysList.map(temp => {
    return <MultiLiveTourneysMenuItem
      activeSportID={activeSportID}
      isAnimating={isAnimating}
      key={`${temp.ID}/${temp.sportID}`}
      tourney={temp}
      callBack={callBack}
      activeEventsID={activeEventsID} />;
  });
  return (
    <section className={b()}>
      <div className={b('button')} onClick={e => !isAnimating && scroll(e, -1)} id="left-button">
        <SVGInline className={b('arrow', { direction: 'left' }).toString()} svg={arrowSvg} />
      </div>
      <div className={b('items')} ref={items}>
        {itemList}
      </div>
      <div className={b('button')} onClick={e => !isAnimating && scroll(e, 1)} id="right-button">
        <SVGInline className={b('arrow', { direction: 'right' }).toString()} svg={arrowSvg} />
      </div>
    </section>
  );
};

MultiLiveTourneysMenu.propTypes = {
  activeSportID: PropTypes.number.isRequired,
  callBack: PropTypes.func.isRequired,
  tourneysList: PropTypes.array.isRequired,
  innerRef: PropTypes.object.isRequired,
  activeEventsID: PropTypes.array.isRequired,
};

export default React.forwardRef((props, ref) => <MultiLiveTourneysMenu innerRef={ref} {...props} />);