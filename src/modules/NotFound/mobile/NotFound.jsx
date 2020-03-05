import React from 'react';
import { Route } from 'react-router-dom';

import NotFound from 'components/NotFound/mobile';

export class NotFoundModule {
  getRoutes() {
    return <Route component={NotFound} />;
  }
}