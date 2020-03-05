import React, { useMemo, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { getSlotsLinks } from 'shared/utils/mainMenuUtill';

import './SlotsMenu.scss';

const SlotsMenu = () => {
  const b = block('slotsmenu');
  const [active, changeActive] = useState('');
  const locale = useSelector(state => state.locale.common, shallowEqual);
  const menuItems = useMemo(() => getSlotsLinks().map(link =>
    (
      <div className={b('slot-link', { active: location.pathname.indexOf(link.url) !== -1 })}
        onClick={() => {
          location.pathname = `slots/${link.url}`;
          changeActive(link.url);
        }}>
        {link.png ? <img src={link.png} alt={link.text} className={b('svg')} /> : <SVGInline svg={link.svg} className={b('svg').toString()} />}
        {link.text && <span className={b('text')}>{locale[link.text]}</span>}
      </div>
    )), [locale, b, active]);
  return (
    <nav className={b()}>
      <div className={b('wrapper')}>
        {menuItems}
      </div>
    </nav>
  );
};

SlotsMenu.propTypes = {
  locale: PropTypes.object.isRequired,
};

export default SlotsMenu;