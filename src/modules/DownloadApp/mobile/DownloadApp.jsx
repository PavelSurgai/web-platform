import React from 'react';
import { Route } from 'react-router-dom';

import DownloadAppLayout from './view/DownloadAppLayout/DownloadAppLayout';

export class DownloadAppModule {
  getRoutes() {
    return (
      <Route key="/download-app-s" path="/download-app-s" component={DownloadAppLayout} />
    );
  }
}
