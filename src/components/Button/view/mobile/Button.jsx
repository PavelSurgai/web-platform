import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Button.scss';

const Button = ({ text, callBack, disabled = false, size = 'default', color = 'green', type = 'button', link }) => {
  const b = block('button');
  return link ? (
    <Link
      className={b({ sizable: size }, { disable: disabled }, { colors: color })}
      to={link}
    >
      {text}
    </Link>) : (
      <button
        type={type}
        className={b({ sizable: size }, { disable: disabled }, { colors: color }).mix('scrollable')}
        onClick={disabled ? f => f : callBack}
      >
        {text}
      </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  link: PropTypes.string,

  callBack: PropTypes.func,
};

export default Button;