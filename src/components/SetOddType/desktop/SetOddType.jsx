import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { oddsTypes } from 'features/userSettings/redux/data/odds';
import ArrowSVG from './img/arrow.svg';
import './SetOddType.scss';

const SetOddType = ({ setOddType, oddType, locale }) => {
  const b = block('set-odd-type');
  const [isOpen, setOpen] = useState(false);
  const items = Object.keys(oddsTypes).map(key => {
    const item = oddsTypes[key].name;
    const isCurent = oddType === item;
    return isCurent ? '' : <div
      className={b('item')}
      key={key}
      onClick={() => setOddType(item)}
    >
      {locale[item]}
    </div>;
  });
  return (
    <div
      className={b({ open: isOpen })}
      onClick={() => setOpen(!isOpen)}
    >
      <div className={b('top')}>
        <div className={b('current-item')}>{locale[oddType]}</div>
        <SVGInline className={b('arrow').toString()} svg={ArrowSVG} />
      </div>
      <div className={b('items')}>
        {items}
      </div>
    </div>
  );
};

SetOddType.propTypes = {
  locale: PropTypes.object.isRequired,
  oddType: PropTypes.string.isRequired,

  setOddType: PropTypes.func.isRequired,
};

export default SetOddType;
