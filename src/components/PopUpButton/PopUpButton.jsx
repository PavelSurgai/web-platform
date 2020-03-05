import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './PopUpButton.scss';

const PopUpButton = ({ text, onClick, disabled = false, type = 'button', color }) => {
  const b = block('pop-up-button');
  return (
    <button
      type={type}
      className={b({ disable: disabled, color }).mix('scrollable')}
      onClick={disabled ? f => f : onClick}
    >
      {text}
    </button>
  );
};

PopUpButton.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  color: PropTypes.string,

  onClick: PropTypes.func,
};

export default PopUpButton;