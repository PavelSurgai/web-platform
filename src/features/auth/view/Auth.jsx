import React, { useState, useCallback } from 'react';
import block from 'bem-cn';
import { useSelector, useDispatch } from 'react-redux'
import SVGInline from 'react-svg-inline';

import Input from 'components/Input';
import { actions } from '../redux';
import lock from './img/lock.svg';

import './Auth.scss';

const Auth = () => {
  const b = block('auth');
  const [userName, changeUserName] = useState('');
  const [password, passwordUserName] = useState('');
  const locale = useSelector(state => state.locale.locale);
  const dispatch = useDispatch();
  const signIn = useCallback(() => dispatch(actions.login(userName, password)), [userName, password, dispatch])

  return <section className={b()}>
    <div className={b('title')}>{locale.login}</div>
    <div className={b('input-block')}>
      {`${locale.userName}:`}
      <Input value={userName} onChange={e => changeUserName(e.currentTarget.value)} />
    </div>
    <div className={b('input-block')}>
      {`${locale.password}:`}
      <Input value={password} onChange={e => passwordUserName(e.currentTarget.value)} type="password" />
    </div>
    <div className={b('bottom')}>
      <div className={b('button')} onClick={signIn}>
        {locale.login}
        <SVGInline svg={lock} className={b('ok').toString()} />
      </div>
    </div>
  </section>
}

export default Auth;
