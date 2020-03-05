import React, { useMemo } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import './SideQuckLinks.scss';

const SideQuckLinks = ({ getQuckLinks, locale }) => {
  const b = block('qucklinks');
  const items = useMemo(() => getQuckLinks().map(item =>
    (
      <div className={b('quck-item')} onClick={() => location.pathname = item.url}>
        <SVGInline className={b('quck-icon').toString()} svg={item.svg} />
        <div className={b('quck-name')}>{locale[item.text]}</div>
      </div>
    )), [locale, getQuckLinks, b]);
  return (
    <nav className={b()}>
      {items}
    </nav>
  );
};

SideQuckLinks.propTypes = {
  getQuckLinks: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};

export default SideQuckLinks;