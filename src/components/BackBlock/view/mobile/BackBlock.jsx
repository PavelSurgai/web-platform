import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import BackButton from './BackButton';

import './BackBlock.scss';

const BackBlock = ({ children, route }) => {
  const b = block('back-block');
  return (
    <div className={b()}>
      <BackButton route={route} />
      <div className={b('content')}>
        {children}
      </div>
    </div>
  );
};

BackBlock.propTypes = {
  route: PropTypes.string,
  children: PropTypes.any,
};

export default BackBlock;