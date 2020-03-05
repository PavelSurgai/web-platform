import React from 'react';
import { Route } from 'react-router-dom';

import { LivePooling } from 'features/live/mobile';
import MainPage from 'features/main/mobile';

export class MainModule {
  getRoutes() {
    return <Route key="/main" path="/main">
      <LivePooling />
      <MainPage />
    </Route>;
  }
}