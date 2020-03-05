import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './SlotsHeader.scss';

const SlotsHeader = ({ locale }) => {
  const b = block('slots');
  return (
    <div className={b('header')}>
      <div className={b('header-text')}>{locale.slots}</div>
    </div>
  );
};

SlotsHeader.propTypes = {
  locale: PropTypes.object.isRequired,
};

export default SlotsHeader;
