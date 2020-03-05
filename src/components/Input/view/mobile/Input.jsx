import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({ value, name, callBack, placeholder = '', size = 'default', type = 'text', isRequired }) => {
  const b = block('input');
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder || ''}
      onChange={callBack}
      className={b({ sizable: size, type })}
      required={isRequired}
      />
  );
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default Input;
