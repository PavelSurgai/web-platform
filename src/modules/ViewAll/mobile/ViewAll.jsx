import React from 'react';
import { Route } from 'react-router-dom';

import ViewAllSport from './view/ViewAllSport';

export class ViewAllModule {
  getRoutes() {
    return (
      <Route key="/sport" path="/sport" component={ViewAllSport} />
    );
  }
}