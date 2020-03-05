import React from 'react';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import PropTypes from 'prop-types';

import ArrowSVG from './img/arrow.svg';
import './UpButton.scss';

const UpButton = ({ text }) => {
  const onButtonUpClick = () => {
    const app = document.getElementsByClassName('app')[0];
    if (app.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      app.scrollBy(0, -30);
      setTimeout(onButtonUpClick, 5);
    }
  };
  const b = block('up-button');
  return (
    <button className={b()} type="button" onClick={onButtonUpClick}>
      <span className={b('text')}>{text}</span>
      <SVGInline className={b('icon').toString()} svg={ArrowSVG} />
    </button>
  );
};

UpButton.propTypes = {
  text: PropTypes.string,
};

export default UpButton;