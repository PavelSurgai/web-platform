import React from 'react';
import { Route } from 'react-router-dom';

import { TotalizatorLayout } from './view/TotalizatorLayout';

export class TotalizatorModule {
  getRoutes() {
    return <Route key="/toto" path="/toto" component={TotalizatorLayout} />;
  }
}