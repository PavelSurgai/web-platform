import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { getPopularLinks, getQuckLinks } from 'shared/utils/mainMenuUtill';

import { SlideOutModel } from 'shared/models/SlideOutModel';
import SideQuckLinks from './SideQuckLinks';
import SidePopularLinks from './SidePopularLinks';
import { SideMenuItem } from './SideMenuItem/SideMenuItem';

import './SideMenu.scss';

export const SideMenu = ({ menuItems, locale }) => {
  const b = block('side-menu');
  const items = menuItems.map(item => <SideMenuItem key={item.textIdent} item={item} locale={locale} />);
  return <nav className={b()}>
    <div className={b('popular')}>
      <div className={b('title', { colorfull: true })}>{locale.popular}</div>
      <SidePopularLinks
        getPopularLinks={getPopularLinks}
        locale={locale}
      />
    </div>
    <div className={b('quck')}>
      <div className={b('title')}>{locale.quck}</div>
      <SideQuckLinks
        getQuckLinks={getQuckLinks}
        locale={locale}
      />
    </div>
    <ul className={b('list')}>
      {items}
    </ul>
  </nav>;
};

SideMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  locale: PropTypes.object,
};
