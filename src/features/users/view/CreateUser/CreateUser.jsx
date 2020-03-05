import React, { useState, useCallback } from 'react';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import { useSelector, useDispatch } from 'react-redux'

import Input from 'components/Input';
import userIcon from '../img/userIcon.svg';

import { actions } from 'features/users/redux';

import './CreateUser.scss';

const CreateUser = () => {
  const b = block('create-user');
  const dispatch = useDispatch();
  const [userName, changeUserName] = useState('');
  const [password, changePassword] = useState('');
  const locale = useSelector(state => state.locale.locale);
  const actionProcessing = useSelector(state => state.users.actionProcessing);

  const onClick = useCallback(() => {
    if (!actionProcessing) dispatch(actions.createUser(userName, password))
  }, [actionProcessing, dispatch, password, userName]);

  return (
    <div className={b()}>
      <div className={b('header')}>{locale.newPlayer}</div>
      <div className={b('wrapper')}>
        <div className={b('item')}>
          <div className={b('title')}>{locale.userName}</div>
          <Input
            placeholder={locale.userName}
            value={userName}
            callBack={e => changeUserName(e.currentTarget.value)}
          />
        </div>
        <div className={b('item')}>
          <div className={b('title')}>{locale.password}</div>
          <Input
            placeholder={locale.password}
            value={password}
            callBack={e => changePassword(e.currentTarget.value)}
          />
        </div>
        <div className={b('button')} onClick={onClick}>
          <span className={b('button-text')}>{locale.createAccount}</span>
          <div className={b('user-icon-wrapper')}>
            <SVGInline svg={userIcon} className={b('user-icon').toString()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;