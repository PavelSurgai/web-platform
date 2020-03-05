import React, { useCallback, useEffect, useState, useRef } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './SlideOut.scss';

const SlideOut = ({ children, menu, closeFunction, isOpen }) => {
  const b = block('slide-out');
  const [startX, changeStartX] = useState(null);
  const [startY, changeStartY] = useState(null);
  const onTouchMove = useCallback(e => {
    e.stopPropagation();
    if (Math.abs(startY - e.touches[0].clientY) < 10 || Math.abs(startX - e.touches[0].clientX) > 200) {
      closeFunction();
    }
  }, [closeFunction]);
  const onTouchStart = useCallback(e => {
    changeStartX(e.touches[0].clientX);
    changeStartY(e.touches[0].clientY);
    e.stopPropagation();
  }, []);
  return (
    <div className={b({ open: isOpen })} onTouchMove={onTouchMove} onTouchStart={onTouchStart}>
      <div className={b('menu')}>{menu}</div>
      <div className={b('content')}>{children}</div>
    </div>
  );
};

SlideOut.propTypes = {
  children: PropTypes.array.isRequired,
  menu: PropTypes.element.isRequired,

  isOpen: PropTypes.bool.isRequired,

  closeFunction: PropTypes.func.isRequired,
};

export default SlideOut;
