import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LineMenu from 'features/line/view/desktop/LineMenu';
import { FavoritesEventsLayout } from './view/FavoritesEventsLayout/FavoritesEventsLayout';
import { LineLayout } from './view/LineLayout/LineLayout';
import { TopEventsLayout } from './view/TopEventsLayout/TopEventsLayout';
import { UpcomingEventsLayout } from './view/UpcomingEventsLayout/UpcomingEventsLayout';

export class LineModule {
  getRoutes() {
    return (
      <Route key="/line" path="/line">
        <Route key="/line" path="/line" component={LineMenu} />
        <Switch>
          <Route key="/line/upcoming-events" path="/line/upcoming-events/:sportID/:countryID" component={UpcomingEventsLayout} />
          <Route key="/line/top-events" path="/line/top-events" component={TopEventsLayout} />
          <Route key="/line/favorites-events" path="/line/favorites-events" component={FavoritesEventsLayout} />
          <Route key="/line/:sportID/:countryID" path="/line/:sportID/:countryID" component={LineLayout} />
        </Switch>
      </Route>
    );
  }
}