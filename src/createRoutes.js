import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

export function createRoutes(modules) {
  const routesFromModules = modules.map(module => module.getRoutes());
  return (
    <Switch>
      <Redirect exact to="/main" from="/" />
      {routesFromModules}
    </Switch>
  );
}