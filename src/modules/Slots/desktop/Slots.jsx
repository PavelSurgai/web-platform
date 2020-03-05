import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SlotsLayout from './view/SlotsLayout';
import SlotsGameLayout from './view/SlotsGameLayout';

export class SlotsModule {
  getRoutes() {
    return (
      <Route key="slots" path="/slots">
        <Switch>
          <Redirect exact to="/slots/all" from="/slots" />
          <Route key="/slots1" exact path="/slots/:section" component={SlotsLayout} />
          <Route key="/slots2" path="/slots/:section/:gameId" component={SlotsGameLayout} />
        </Switch>
      </Route>
    );
  }
}
