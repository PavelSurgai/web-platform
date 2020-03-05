import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import filter from '../img/filter.svg';

import './BackBlockContent.scss';

const BackBlockContent = ({ title, changeOpenFilter }) => {
  const b = block('back-block');
  return (
    <React.Fragment>
      <div className={b('title')}>{title}</div>
      <div className={b('filter-button')} onClick={changeOpenFilter}>
        <SVGInline className={b('filter-button-icon').toString()} svg={filter} />
      </div>
    </React.Fragment>
  );
};

BackBlockContent.propTypes = {
  title: PropTypes.string.isRequired,
  changeOpenFilter: PropTypes.func.isRequired,
};

export default BackBlockContent;
