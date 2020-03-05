import React, { useMemo, useState } from 'react';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import openSvg from './img/open.svg';
import awaySvg from './img/away.svg';

import './MenuItem.scss';

const MenuItem = ({ locale, item }) => {
  const b = block('menu-item');
  const [isOpen, changeOpen] = useState(false);
  const itemList = useMemo(() => item.items.map(temp => <Link className={b('element')} key={temp.textId} to={temp.route}>
    {locale[temp.textId]}
    <SVGInline svg={awaySvg} className={b('image').toString()} />
  </Link>), [])
  return <React.Fragment>
    <div className={b()} onClick={() => changeOpen(!isOpen)}>
      {locale[item.textId]}
      <SVGInline svg={openSvg} className={b('image').toString()} />
    </div>
    {isOpen && <div className={b('element-list')}>
      {itemList}
    </div>}
  </React.Fragment>
}

export default MenuItem;
