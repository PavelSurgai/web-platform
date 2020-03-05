import React, { useEffect } from 'react';
import block from 'bem-cn';
import { Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

import { actions as authAction } from './features/Auth';
import Notify from 'features/notify/view';
import CreateUser from './features/users/view/CreateUser';
import UsersList from './features/users/view/UsersList';
import UserEdit from './features/users/view/UserEdit';
import { Total } from './features/Total';

import TransactionHistory from './features/transaction/view/TransactionHistory';

import Footer from 'components/Footer';
import Header from 'components/Header';

import { Locale } from 'features/locale'
import { Auth } from 'features/Auth';
import Subheader from 'components/Subheader';
import Menu from 'components/Menu';

import './App.scss';

const App = () => {
  const b = block('app');
  const locale = useSelector(state => state.locale.locale);
  const isAuth = useSelector(state => state.auth.isAuth);
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.checkAuth());
  }, [])
  return (
    <div className={b()}>
      <Notify />
      {isAuth && <Header />}
      {isAuth && <Subheader user={user} getBalance={authAction.getBalance} />}
      {isAuth ?
        <Switch>
          <Route exact key="/user-create" path="/user-create" component={CreateUser} />
          <Route exact key="/locale" path="/locale" component={Locale} />
          <Route exact key="/users-list" path="/users-list" component={UsersList} />
          <Route exact key="/" path="/" component={Menu} />
          <Route exact key="/total" path="/total" component={Total} />
          <Route exact key="/user-edit/:id" path="/user-edit/:id" component={UserEdit} />
          <Route exact key="/transaction-history" path="/transaction-history" component={TransactionHistory} />
        </Switch> :
        <Auth />
      }
      <Footer locale={locale} isAuth={isAuth} />
    </div>
  );
}

export default App;
