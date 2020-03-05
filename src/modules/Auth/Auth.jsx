import React from 'react';
import { Route } from 'react-router-dom';

import Auth from '../../features/Auth';

export class AuthMod {
  getRoutes() {
    return (
      <Route key="/auth" path="/auth" component={Auth} />
    );
  }
}