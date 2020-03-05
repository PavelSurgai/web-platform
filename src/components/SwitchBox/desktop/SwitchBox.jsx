import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './SwitchBox.scss';

export const SwitchBox = ({ isActive, callBack }) => {
  const b = block('switch-box');
  return (
    <div className={b({ active: isActive })} onClick={() => callBack(!isActive)}>
      <div className={b('indicator')} />
    </div>
  );
};

SwitchBox.propTypes = {
  isActive: PropTypes.bool.isRequired,
  callBack: PropTypes.func.isRequired,
};