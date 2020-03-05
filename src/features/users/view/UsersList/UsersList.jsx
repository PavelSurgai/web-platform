import React, { useEffect, useState, useMemo, useCallback } from 'react';
import block from 'bem-cn';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import { actions } from 'features/users/redux';

import Input from 'components/Input';

import searchSvg from '../img/search.svg';
import arrowSvg from '../img/arrow.svg';

import './UsersList.scss';

const UsersList = () => {
  const b = block('users-list');
  const [filterValue, onChangeFilterValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getUsersList());
  }, [dispatch]);

  const changeFilterValue = useCallback(e => {
    onChangeFilterValue(e.currentTarget.value);
  }, []);

  const locale = useSelector(state => state.locale.locale, shallowEqual);
  const usersList = useSelector(state => state.users.usersList, shallowEqual);

  const list = useMemo(() => usersList.users?.filter(t =>
    ~t.nickname?.toUpperCase().indexOf(filterValue.toUpperCase()) || false).map(item => (
      <Link key={item.id} className={b('item')} to={`/user-edit/${item.id}`}>
        <div className={b('item-nick')}>{item.nickname}</div>
        <div className={b('item-right')}>
          <div className={b('item-balance')}>{item.balance}</div>
          <div className={b('arrow-box')}><SVGInline svg={arrowSvg} className={b('arrow').toString()} /></div>
        </div>
      </Link>
    )) || [], [b, filterValue, usersList])

  return (
    <div className={b()}>
      <div className={b('header')}>{locale.userCardBalances}</div>
      <div className={b('filter-block')}>
        <SVGInline svg={searchSvg} className={b('search-icon').toString()} />
        <Input
          value={filterValue}
          callBack={changeFilterValue}
          style={{ paddingLeft: '2rem' }}
        />
      </div>
      <div className={b('subheader')}>
        <div className={b('subheader-text')}>
          <span>{locale.userCard}</span>
          <span>{locale.accountBalance}</span>
        </div>
        <div className={b('subheader-count')}>
          <span className={b('bold-text')}>{usersList.quantity}</span>
          <span className={b('bold-text')}>{usersList.totalBalance}</span>
        </div>
      </div>
      <div className={b('list')}>
        {list}
      </div>
    </div>
  );
};

export default UsersList;