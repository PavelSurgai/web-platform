import React from 'react';
import { Route } from 'react-router-dom';

import Broadcast from 'features/broadcast/desktop';

export class BroadcastModule {
  getRoutes() {
    return <Route
      key="/broadcast"
      path="/hidden-broadcast"
      component={Broadcast}
    />;
  }
}