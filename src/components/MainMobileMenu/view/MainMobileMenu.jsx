import React, { useState, useDispatch, useCallback } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { Link, withRouter } from 'react-router-dom';

import { MainMenuItems, ActiveCheck } from '../data/mainMobileMenuItems';

import basketSVG from '../data/mainMobileMenuItems/iconsMobileMenu/basket.svg';

import './MainMobileMenu.scss';

const MainMobileMenu = ({ location, innerRef, sideMenuControl, isMenuOpen, count }) => {
  const b = block('main-mobile-menu');
  const menuItems = MainMenuItems.map(temp => (temp.isBtn === undefined ?
    <Link key={temp.route} to={temp.route} className={b('item', { active: ActiveCheck(temp, location) })}>
      <SVGInline className={b('icon').toString()} svg={temp.icon} alt="" />
    </Link> :
    <div className={b('item', { active: isMenuOpen })} onClick={() => sideMenuControl(!isMenuOpen)}>
      <SVGInline className={b('icon').toString()} svg={temp.icon} alt="" />
    </div>));
  const basket = <Link className={b('basket', { active: ActiveCheck({ route: '/basket' }, location) })} onClick={() => ActiveCheck({ route: '/basket' }, location)} to="/basket">
    <SVGInline className={b('basket-icon').toString()} svg={basketSVG} />
    <div className={b('count')}>{count}</div>
  </Link>;
  const menuItemsBasket = menuItems.slice(0, 2).concat(basket).concat(menuItems.slice(2, 4));
  return (
    <section className={b()} ref={innerRef}>
      {menuItemsBasket}
    </section>
  );
};

MainMobileMenu.propTypes = {
  location: PropTypes.object.isRequired,
  innerRef: PropTypes.object.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  count: PropTypes.string.isRequired,

  sideMenuControl: PropTypes.func.isRequired,
};

const MainMobileMenuWithRouter = withRouter(MainMobileMenu);

export default React.memo(React.forwardRef((props, ref) => <MainMobileMenuWithRouter innerRef={ref} {...props} />));
