import React from 'react';
import { Route, Switch } from 'react-router-dom';

import FullEventLineLayout from './view/FullEventLineLayout';
import FullEventLiveLayout from './view/FullEventLiveLayout';

export class FullEventModule {
  getRoutes() {
    return (
      <Route key="full-event" path="/full-event">
        <Switch>
          <Route key="/full-event/line/:eventID" path="/full-event/line/:eventID" component={FullEventLineLayout} />
          <Route key="/full-event/live/:eventID" path="/full-event/live/:eventID" component={FullEventLiveLayout} />
        </Switch>
      </Route>
    );
  }
}