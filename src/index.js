import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './configureStore';
import Api from './services/api';

const api = new Api(process.env.NODE_ENV === 'production' ? '' : 'https://gooal24.com');
const store = configureStore({ api });


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
