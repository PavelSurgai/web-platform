import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { MainLiveMenu, LivePooling, LiveSports, LiveTourneys } from 'features/live/mobile';
import LiveLayout from './view/LiveLayout';

export class LiveModule {
  getRoutes() {
    return (
      <Route key="live" path="/live">
        <MainLiveMenu />
        <LivePooling />
        <Switch>
          <Route key="/live" exact path="/live" component={LiveLayout} />
          <Route key="/live/sports" exact path="/live/sports" component={LiveSports} />
          <Route path="/live/sport:sportID" component={LiveTourneys} />
        </Switch>
      </Route>
    );
  }
}
