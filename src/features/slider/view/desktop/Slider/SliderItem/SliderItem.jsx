import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import style from 'features/slider/redux/data/sectionStyles';
import './SliderItem.scss';

const SliderItem = ({ callBack, item, number, isActive, isAction, isAnimation, unActiveSlideWidth }) => {
  const imageURL = process.env.NODE_ENV === 'production' ? item.url_image : `https://pitch90bet.com/${item.url_image}`;
  const b = block('slider-item');
  const currentStyle = isActive ? { ...style.sectionStyleActive } : { ...style.sectionStyleUnActive, width: `${+unActiveSlideWidth}px` };
  currentStyle.minWidth = (isActive && !isAnimation) && 630;
  currentStyle.background = `url(${imageURL}) no-repeat`;
  return isActive ? <a
    className={b({ active: isActive || isAction })}
    href={item.url}
    style={currentStyle}
    onClick={() => callBack(number)} /> : (
      <div
        key={number}
        className={b({ active: isActive || isAction })}
        href={item.url}
        style={currentStyle}
        onClick={() => callBack(number)}
      >
        {!isActive && <div className={b('shadow', { noAnimated: !isAnimation })} />}
      </div>
  );
};

SliderItem.propTypes = {
  item: PropTypes.object.isRequired,
  number: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  isAction: PropTypes.bool.isRequired,
  isAnimation: PropTypes.bool.isRequired,

  callBack: PropTypes.func.isRequired,
};

export default SliderItem;
