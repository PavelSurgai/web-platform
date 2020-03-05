import React from 'react';
import { Route } from 'react-router-dom';

import { BonusesLayout } from './view/BonusesLayout';

export class BonusesModule {
  getRoutes() {
    return <Route key="/bonuses" path="/bonuses" component={BonusesLayout} />;
  }
}
