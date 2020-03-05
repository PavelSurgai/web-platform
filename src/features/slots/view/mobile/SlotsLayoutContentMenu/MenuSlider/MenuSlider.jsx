import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import arrowSvg from 'features/fullEvent/view/img/arrow.svg';

import './MenuSlider.scss';

const MenuSlider = ({ items }) => {
  const b = block('slots-layout-content');

  const leftScroll = e => {
    const itemsBlock = e.currentTarget.parentNode.querySelector(`.slots-layout-content__menu-items`);
    const iterator = i => {
      itemsBlock.scrollTo(itemsBlock.scrollLeft - 5, 0);
      if (i < 50) setTimeout(() => iterator(i + 1), 1);
    };
    iterator(0);
  };
  
  const rightScroll = e => {
    const itemsBlock = e.currentTarget.parentNode.querySelector(`.slots-layout-content__menu-items`);
    const iterator = i => {
      itemsBlock.scrollTo(itemsBlock.scrollLeft + 5, 0);
      if (i < 50) setTimeout(() => iterator(i + 1), 1);
    };
    iterator(0);
  };

  return (
    <div className={b('menu').mix('scrollable')}>
      <div className={b('button')} onClick={leftScroll}>
        <SVGInline className={b('arrow', { direction: 'left' }).toString()} svg={arrowSvg} />
      </div>
      <div className={b(`menu-items`)}>
        {items}
      </div>
      <div className={b('button')} onClick={rightScroll}>
        <SVGInline className={b('arrow', { direction: 'right' }).toString()} svg={arrowSvg} />
      </div>
    </div>
  );
};

MenuSlider.propTypes = {
  items: PropTypes.array.isRequired,
  isSubMenu: PropTypes.bool,
}

export default MenuSlider;