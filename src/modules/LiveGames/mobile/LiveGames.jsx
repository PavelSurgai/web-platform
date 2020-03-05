import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LiveGamesAll from 'features/liveGames/view/mobile/LiveGamesAll';
import LiveGame from 'features/liveGames/view/mobile/LiveGame';

export class LiveGamesModule {
  getRoutes() {
    return [
      <Route key="/live-casino-all" exact path="/live-casino/all" component={LiveGamesAll} />,
      <Route key="/live-casino-game" path="/live-casino/:game" component={LiveGame} />,
    ];
  }
}