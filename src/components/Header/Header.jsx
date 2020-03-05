import React, { useMemo, useCallback } from 'react';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import arrowSvg from './img/arrow.svg';

import './Header.scss';

const Header = ({ location, history }) => {
  const b = block('header');
  const locale = useSelector(state => state.locale.locale);
  const isNeedBackButton = useMemo(() => location.pathname !== '/', [location.pathname]);

  const onClick = useCallback(() => {
    if (isNeedBackButton) history.goBack();
  }, [history, isNeedBackButton]);
  const text = locale[location.pathname.substring(0, location.pathname.lastIndexOf('/') === 0 ? location.pathname.length : location.pathname.lastIndexOf('/'))];
  
  return (
    <div className={b()}>
      <div className={b('left')} onClick={onClick}>
        {isNeedBackButton &&
          <SVGInline className={b('arrow').toString()} svg={arrowSvg} />
        }
      </div>
      <div className={b('center')}>
      <div className={b('text')}>{text}</div>
      </div>
      <div className={b('right')} />
    </div>
  );
};

export default withRouter(Header);