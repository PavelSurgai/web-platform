import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import Plug from 'components/Plug';

import configureStore from './configureStore';

import App from './modules/App/mobile';
import { AuthModule, LineModule, LiveModule, FullEventModule, BasketModule, ProfileModule, SlotsModule,
  FlatPagesModule, ResultsModule, LiveGamesModule, DownloadAppModule, RestoreByEmailModule,
  CybersportModule, ContactsModule, BonusesModule, MainModule, NotFoundModule, } from './modules/mobile';
import './shared/style/mobile.scss';

import Api from './shared/api';
import { createRoutes } from './createRoutes';

OfflinePluginRuntime.install();

const apiUrl = process.env.NODE_ENV === 'production' ? '' : 'https://seven-bet.com';
const api = new Api(apiUrl);

const modules = [
  new AuthModule(),
  new MainModule(),
  new DownloadAppModule(),
  new SlotsModule(),
  new LineModule(),
  new ResultsModule(),
  new LiveModule(),
  // new ViewAllModule(),
  // new TotalizatorModule(),
  new FullEventModule(),
  new LiveGamesModule(),
  new BasketModule(),
  new ProfileModule(),
  new FlatPagesModule(),
  new RestoreByEmailModule(),
  new CybersportModule(),
  new ContactsModule(),
  new BonusesModule(),
  new NotFoundModule(), // ставить в конце
];
const childrens = createRoutes(modules);

const store = configureStore({ api });

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>{childrens}</App>
    </BrowserRouter>
  </Provider>, document.getElementById('root'),
);
