import React from 'react';
import block from 'bem-cn';
import { useSelector } from 'react-redux';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import Button from 'components/Button/mobile';

import supportSVG from '../img/support.svg';

import './NotFound.scss';

const NotFound = () => {
  const b = block('not-found');
  const locale = useSelector(state => state.locale.common);
  return (
    <div className={b()}>
      <SVGInline svg={supportSVG} className={b('icon')} />
      <div className={b('number')}>404</div>
      <div className={b('text')}>{locale.notFound}</div>
      <Link className={b('link')} to="main">
        <Button text={locale.toMain} color="dark" size="low" />
      </Link>
    </div>
  );
};

export default NotFound;