import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import LogoutSVG from './img/logout.svg';
import './ProfileMenu.scss';

export const ProfileMenu = ({ items, locale, logout }) => {
  const b = block('profile-menu');
  const menuItems = items.map(item => <li className={b('item')} key={item.link}>
    <Link className={b('item-link')} to={item.link}>
      <SVGInline className={b('item-icon').toString()} svg={item.icon} />
      <span className={b('item-text')}>{locale[item.textIdent]}</span>
    </Link>
  </li>);

  return (
    <nav className={b()}>
      <ul className={b('item-list')}>
        {menuItems}
        <li className={b('item')}>
          <Link className={b('item-link')} onClick={logout} to="/">
            <SVGInline className={b('item-icon').toString()} svg={LogoutSVG} />
            <span className={b('item-text')}>{locale.logout}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

ProfileMenu.propTypes = {
  items: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired,

  logout: PropTypes.func.isRequired,
};