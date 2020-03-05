import React from 'react';
import { Route } from 'react-router-dom';

import MobileMenu from 'features/mobileMenu';

export class Menu {
  getRoutes() {
    return <Route key="/menu" path="/menu" component={MobileMenu} />;
  }
}