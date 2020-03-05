import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { NavLink } from 'react-router-dom';

import ArrowSVG from './img/arrow.svg';
import './ProfileMenu.scss';

export const ProfileMenu = ({ tabs, locale }) => {
  const b = block('profile-menu');
  const items = Object.values(tabs).map(item => <li key={item.route} className={b('item')}>
    <NavLink
      className={b('item-link').toString()}
      to={item.route}
      activeClassName={b('item-link', { active: true }).toString()}
    >
      <SVGInline className={b('item-link-arrow').toString()} svg={ArrowSVG} />
      <span className={b('item-link-text')}>{locale[item.textIdent]}</span>
    </NavLink>
  </li>);
  return (
    <nav className={b()}>
      <ul className={b('list')}>
        {items}
      </ul>
    </nav>
  );
};

ProfileMenu.propTypes = {
  tabs: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
};