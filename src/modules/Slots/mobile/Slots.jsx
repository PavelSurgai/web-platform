import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import SlotsLayout from './view/SlotsLayout';
import SlotsSectionLayout from './view/SlotsSectionLayout';

export class SlotsModule {
  getRoutes() {
    return (
      <Route key="slots" path="/slots">
        <Switch>
          <Route key="/slots1" exact path="/slots" component={SlotsLayout} />
          <Route key="/slots2" path="/slots/:section" component={SlotsSectionLayout} />
        </Switch>
      </Route>
    );
  }
}