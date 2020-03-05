import React from 'react';
import block from 'bem-cn';

import './Input.scss';

const Input = ({ value, name, callBack, placeholder = '', size = 'default', type = 'text', isRequired, ...props }) => {
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
      {...props}
      />
  );
};

export default Input;