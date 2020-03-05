import React, { useMemo } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import { getSportImgByID } from 'shared/utils/sports';
import arrow from '../../../img/arrow.svg';
import './SportMenuItem.scss';

const SportMenuItemСomponent = ({ id, text }) => {
  const b = block('sport-menu-item');
  const imgSrc = useMemo(() => getSportImgByID(id), [id]);

  return <li className={b()}>
    <Link className={b('link')} to={`/line/sport${id}`}>
      <img className={b('icon')} src={imgSrc} alt="" />
      <span className={b('text')}>{text}</span>
      <SVGInline svg={arrow} className={b('arrow').toString()} />
    </Link>
  </li>;
};

SportMenuItemСomponent.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

const MemoSportMenuItem = React.memo(SportMenuItemСomponent);

export { MemoSportMenuItem as SportMenuItem };