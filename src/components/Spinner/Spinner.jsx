import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import circle from './img/loading.svg';
import './Spinner.scss';

export const Spinner = ({ isLoading, size = 'default' }) => {
  const b = block('spinner');
  return isLoading ? (
    <div className={b('wrapper', { loading: isLoading })}>
      <SVGInline svg={circle} className={b('logo')} />
    </div>
  ) : '';
};

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  size: PropTypes.string,
};