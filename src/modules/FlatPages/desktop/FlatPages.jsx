import React from 'react';
import { Route } from 'react-router-dom';

import { FlatPagesLayout } from './view/FlatPagesLayout';

export class FlatPagesModule {
  getRoutes() {
    return <Route exact key="/flatPages/:flatPageName" path="/flatPages/:flatPageName" component={FlatPagesLayout} />;
  }
}