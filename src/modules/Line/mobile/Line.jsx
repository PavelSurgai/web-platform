import React from 'react';
import { Route } from 'react-router-dom';

import LineLayout from './view/LineLayout/LineLayout';

export class LineModule {
  getRoutes() {
    return (
      <Route key="/line" path="/line" component={LineLayout} />
    );
  }
}
