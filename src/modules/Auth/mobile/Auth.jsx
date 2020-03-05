import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SignInLayout from './view/SignInLayout/SignInLayout';
import SignUpLayout from './view/SignUpLayout/SignUpLayout';

export class AuthModule {
  getRoutes() {
    return (
      <Route key="/auth" path="/auth">
        <Switch>
          <Route key="/auth/sign-in" path="/auth/sign-in" component={SignInLayout} />
          <Route key="/auth/sign-up" path="/auth/sign-up" component={SignUpLayout} />
        </Switch>
      </Route>
    );
  }
}