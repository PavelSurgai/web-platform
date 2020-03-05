import {
  compose,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import { reducer as localeReducer } from './features/locale';
import { reducer as authReducer } from './features/Auth';
import { reducer as notifyReducer } from './features/notify';
import { reducer as transactionReduces } from './features/transaction';
import { reducer as users } from './features/users/redux';
import { reducer as totalReducee } from './features/Total';


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
    locale: localeReducer,
    auth: authReducer,
    notify: notifyReducer,
    users: users,
    total: totalReducee,
    transaction: transactionReduces,
  });
}


export { createReducer };
export default configureStore;
