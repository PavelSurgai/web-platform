import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { NavLink } from 'react-router-dom';

import LogOutSVG from '../../img/logout.svg';
import UserSVG from '../../img/user.svg';
import './UserBlock.scss';

export const UserBlock = ({ items, locale, logOut }) => {
  const b = block('user-block');
  const [isOpen, changeOpen] = useState(false);
  const links = items.map(item => <li className={b('item')} key={item.route}>
    <NavLink
      className={b('link').toString()}
      to={item.route}
      activeClassName={b('link', { active: true }).toString()}
    >
      <SVGInline className={b('link-icon').toString()} svg={item.icon} />
      <div className={b('separator')} />
      <span className={b('link-text')}>{locale[item.textIdent]}</span>
    </NavLink>
  </li>);
  return (
    <section className={b()}
      onClick={() => changeOpen(!isOpen)}
      onMouseLeave={() => changeOpen(false)}
    >
      <div className={b('user')}>
        <SVGInline className={b('user-icon').toString()} svg={UserSVG} />
      </div>
      <ul className={b('items', { open: isOpen })}>
        {links}
        <li className={b('item')} onClick={() => logOut()}>
          <div
            className={b('link')}
          >
            <SVGInline className={b('link-icon').toString()} svg={LogOutSVG} />
            <div className={b('separator')} />
            <span className={b('link-text')}>{locale.logout}</span>
          </div>
        </li>
      </ul>
    </section>
  );
};

UserBlock.propTypes = {
  items: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired,

  logOut: PropTypes.func.isRequired,
};
