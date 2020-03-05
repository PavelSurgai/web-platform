import React from 'react';
import { Route } from 'react-router-dom';

import { ProfileLayout } from './view/ProfileLayout';

export class ProfileModule {
  getRoutes() {
    return <Route key="/profile" path="/profile" component={ProfileLayout} />;
  }
}