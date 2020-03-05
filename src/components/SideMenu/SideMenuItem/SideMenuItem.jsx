import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import ArrowSVG from './img/arrow.svg';
import './SideMenuItem.scss';

export const SideMenuItem = ({ item, locale }) => {
  const b = block('side-menu-item');
  const [isOpen, changeOpen] = useState(true);

  const inItems = item.childs ? item.childs.map(inItem => <li className={b('in-item')} key={inItem.textIdent}>
    <div className={b('in-item-circle')} />
    <div className={b('in-item-link')} onClick={() => location.pathname = inItem.link} >
      {locale[inItem.textIdent]}
    </div>
  </li>) : null;

  return <li className={b({ open: isOpen })}>
    <div className={b('main')}>
      <div className={b('link')} onClick={() => location.pathname = item.link}>
        <SVGInline className={b('icon').toString()} svg={item.icon} />
        <span className={b('text')}>{locale[item.textIdent]}</span>
      </div>
      {item.childs ? <SVGInline
        className={b('arrow').toString()}
        svg={ArrowSVG}
        onClick={() => changeOpen(!isOpen)} /> : null}
    </div>
    {isOpen && <ul className={b('in-items')}>{inItems}</ul>}
  </li>;
};

SideMenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  locale: PropTypes.object,
};
