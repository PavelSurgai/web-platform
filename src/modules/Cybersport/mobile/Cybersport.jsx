import React from 'react';
import { Route } from 'react-router-dom';

import Cybersport from 'features/cybersport/mobile';

export class CybersportModule {
  getRoutes() {
    return <Route exact key="/cybersport" path="/cybersport" component={Cybersport} />;
  }
}