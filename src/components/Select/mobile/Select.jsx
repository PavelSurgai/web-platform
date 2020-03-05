import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInlive from 'react-svg-inline';

import ArrowSVG from './img/arrow.svg';
import blueArrow from './img/blueArrow.svg';
import './Select.scss';

const Select = ({ items, activeItem, onChange }) => {
  const b = block('select');
  const [isOpen, changeOpen] = useState(false);
  const itemsList = items.map(item => <li
    key={item.value}
    className={b('item')}
    onClick={() => onChange(item.value)}
  >
    {item.name}
  </li>);
  return (
    <div
      className={b({ open: isOpen })}
      onClick={() => changeOpen(!isOpen)}
      onMouseLeave={() => changeOpen(false)}
    >
      <div className={b('item', { current: true })}>
        {activeItem.name}
        <SVGInlive className={b('arrow').toString()} svg={blueArrow} />
      </div>
      {isOpen && <ul className={b('items-list')}>{itemsList}</ul>}
    </div>
  );
};

Select.propTypes = {
  items: PropTypes.array.isRequired,
  activeItem: PropTypes.object.isRequired,

  onChange: PropTypes.func.isRequired,
};

export default Select;