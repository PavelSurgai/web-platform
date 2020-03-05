import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LiveMenu } from 'features/live/desktop';
import LiveLayout from './view/LiveLayout';
import MultiLiveLayout from './view/MultiLiveLayout';

export class LiveModule {
  getRoutes() {
    return (
      <Route key="live" path="/live">
        <LiveMenu />
        <Route key="/live" exact path="/live" component={LiveLayout} />
        <Route key="/live/multi-live" exact path="/live/multi-live" component={MultiLiveLayout} />
      </Route>
    );
  }
}