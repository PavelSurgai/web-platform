import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Cybersport from 'features/cybersport/desktop';
import FullEventLineLayout from './view/FullEventLineLayout';

export class CybersportModule {
  getRoutes() {
    return <Route key="/cybersport" path="/cybersport">
      <Switch>
        <Route exact key="/cybersport" path="/cybersport" component={Cybersport} />
        <Route
          key="/cybersport/full-event/line/:eventID"
          path="/cybersport/full-event/line/:eventID"
          component={FullEventLineLayout} />
      </Switch>
    </Route>;
  }
}