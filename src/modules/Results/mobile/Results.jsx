import React from 'react';
import { Route } from 'react-router-dom';

import { ResultsLayout } from './view/ResultsLayout';

export class ResultsModule {
  getRoutes() {
    return <Route key="/resuls" path="/results" component={ResultsLayout} />;
  }
}