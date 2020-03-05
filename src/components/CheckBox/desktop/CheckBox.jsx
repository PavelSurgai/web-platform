import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import checkImg from '../img/check.png';
import './CheckBox.scss';

const CheckBox = ({ checked, callBack, name }) => {
  const b = block('check-box');
  return (
    <div className={b()}>
      <div className={b('view')}>{checked && <img src={checkImg} alt="" />}</div>
      <input
        className={b('input')}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={callBack}
      />
    </div>
  );
};

CheckBox.propTypes = {
  callBack: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default CheckBox;