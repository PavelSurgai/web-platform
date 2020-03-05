import React from 'react';
import { Route } from 'react-router-dom';

import Basket from 'features/basket/mobile';

export class BasketModule {
  getRoutes() {
    return (
      <Route key="/basket" path="/basket" component={Basket} />
    );
  }
}