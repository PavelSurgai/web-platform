import {
  compose,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import { reducer as lineReducer } from './features/line';
import { reducer as liveReducer } from './features/live';
import { reducer as localeReducer } from './features/locale';
import { reducer as userSettingsReducer } from './features/userSettings';
import { reducer as authReducer } from './features/auth';
import { reducer as notifyReducer } from './features/notify';
import { reducer as flatPagesReducer } from './features/flatPages';
import { reducer as sportMenuReducer } from './features/sportMenu';
import { reducer as profileReducer } from './features/profile';
import { reducer as paymentReducer } from './features/payment';
import { reducer as payHistoryReducer } from './features/payHistory';
import { reducer as fullEventReducer } from './features/fullEvent';
import { reducer as betHistoryReducer } from './features/betHistory';
import { reducer as basketReducer } from './features/basket';
import { reducer as sliderReducer } from './features/slider';
import { reducer as promocodeReducer } from './features/promocodes';
import { reducer as betgamesReducer } from './features/betgames';
import { reducer as advertisingReducer } from './features/advertising';
import { reducer as outcomeReducer } from './features/slots/outcome';
import { reducer as inbetReducer } from './features/slots/inbet';
import { reducer as evolutionReducer } from './features/evolution';
import { reducer as liveGamesReducer } from './features/liveGames';
import { reducer as resultsReducer } from './features/results';
import { reducer as totoReducer } from './features/toto';
import { reducer as cybersportRerucer } from './features/cybersport';
import { reducer as DownloadReducer } from './features/downloadApp';
import { reducer as broadcastReducer } from './features/broadcast';

function configureStore(extra) {
  const middlewares = [
    thunk.withExtraArgument(extra),
  ];

  const reducer = createReducer();

  // TODO: отключить devtools в production
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      persistState(['userSettings', 'auth']),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }) : (arg => arg),
    ),
  );

  return store;
}

function createReducer() {
  return combineReducers({
    line: lineReducer,
    live: liveReducer,
    basket: basketReducer,
    userSettings: userSettingsReducer,
    auth: authReducer,
    toto: totoReducer,
    notify: notifyReducer,
    locale: localeReducer,
    flatPages: flatPagesReducer,
    sportMenu: sportMenuReducer,
    cybersport: cybersportRerucer,
    profile: profileReducer,
    payment: paymentReducer,
    payHistory: payHistoryReducer,
    fullEvent: fullEventReducer,
    betHistory: betHistoryReducer,
    slider: sliderReducer,
    promocode: promocodeReducer,
    betgames: betgamesReducer,
    advertising: advertisingReducer,
    results: resultsReducer,
    inbet: inbetReducer,
    outcome: outcomeReducer,
    liveGames: liveGamesReducer,
    evolution: evolutionReducer,
    downloadApp: DownloadReducer,
    broadcast: broadcastReducer,
  });
}


export { createReducer };
export default configureStore;
