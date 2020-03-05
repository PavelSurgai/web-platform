import React, { useMemo } from 'react';
import block from 'bem-cn';
import { useSelector } from 'react-redux'

import menuItems from './data';
import MenuItem from './MenuItem';

import './Menu.scss';

const Menu = () => {
  const b = block('menu');
  const locale = useSelector(state => state.locale.locale);
  const itemList = useMemo(() => menuItems.map(temp => <MenuItem locale={locale} item={temp} key={temp.textId} />), [locale])
  return <section className={b()}>
    {itemList}
  </section>
}

export default Menu;
