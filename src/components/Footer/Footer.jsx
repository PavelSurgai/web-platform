import React from 'react';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SVGInline from 'react-svg-inline';

import { actions as authActions } from 'features/Auth';

import settings from './img/settings.svg';
import logout from './img/logout.svg';

import './Footer.scss';

const Footer = ({ locale, lang, changeLang, logOut, isAuth }) => {
  const b = block('footer');
  const dispatch = useDispatch();

  return <footer className={b()}>
    <div className={b('title')}>{locale.other}</div>
    <Link to='/locale' className={b('item')}>
      {locale.changeLang}
      <SVGInline svg={settings} className={b('image').toString()} />
    </Link>
    {isAuth && <div className={b('item')} onClick={() => dispatch(authActions.logOut())}>
      {locale.logout}
      <SVGInline svg={logout} className={b('image').toString()} />
    </div>}
  </footer>
}

export default Footer;