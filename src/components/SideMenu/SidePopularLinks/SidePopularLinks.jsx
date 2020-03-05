import React, { useMemo } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import './SidePopularLinks.scss';

const SidePopularLinks = ({ getPopularLinks, locale }) => {
  const b = block('poplinks');
  const items = useMemo(() => getPopularLinks(location.pathname).map(item => (
    <div className={b('pop-item')} onClick={() => location.pathname = item.url}>
      <SVGInline className={b('pop-icon').toString()} svg={item.svg} />
      <div className={b('pop-name')}>{locale[item.text]}</div>
    </div>
  )), [getPopularLinks, locale, b]);
  return (
    <nav className={b()}>
      {items}
    </nav>
  );
};

SidePopularLinks.propTypes = {
  getPopularLinks: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};

export default SidePopularLinks;