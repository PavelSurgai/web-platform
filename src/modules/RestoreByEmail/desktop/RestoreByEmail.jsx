import React from 'react';
import { Route } from 'react-router-dom';

import { RestoreByEmailLayout } from './view/RestoreByEmailLayout';

export class RestoreByEmailModule {
  getRoutes() {
    return <Route key="/restore-password" path="/restore-password" component={RestoreByEmailLayout} />;
  }
}