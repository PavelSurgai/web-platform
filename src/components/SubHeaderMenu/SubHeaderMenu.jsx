import React, { useState, useMemo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { getSubHeaderLinks } from 'shared/utils/mainMenuUtill';
import rightArrow from './img/right.svg';
import topArrow from './img/top.svg';

import './SubHeaderMenu.scss';

const SubHeaderMenu = () => {
  const b = block('subheader-menu');
  const [isOpen, changeOpen] = useState(true);
  const locale = useSelector(state => state.locale.common, shallowEqual);
  const links = useMemo(() => getSubHeaderLinks(isOpen).map(link =>
    (
      <div className="link-item" onClick={() => location.pathname = link.url}>
        <SVGInline svg={link.svg} className={('link-item__svg').toString()} />
        <span className={b('link-item__text')}>{locale[link.text]}</span>
      </div>
    )), [isOpen, locale, b]);

  return (
    <div className={b()}>
      <div className={b('links')}>{links}</div>
      <div className={b('open-btn')} onClick={() => changeOpen(!isOpen)}>
        <SVGInline svg={isOpen ? topArrow : rightArrow} className={b('btn').toString()} />
        {!isOpen && <span>{locale.all}</span>}
      </div>
    </div>
  );
};

SubHeaderMenu.propTypes = {
  locale: PropTypes.object.isRequired,
};

export default SubHeaderMenu;