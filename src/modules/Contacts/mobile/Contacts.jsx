import React from 'react';
import { Route } from 'react-router-dom';

import ContactsLayout from './view/ContactsLayout/ContactsLayout';
import AboutUsLayout from './view/AboutUsLayout/AboutUsLayout';

export class ContactsModule {
  getRoutes() {
    return [
      <Route key="contacts" path="/contacts" component={ContactsLayout} />,
      <Route key="about-us" path="/about-us" component={AboutUsLayout} />,
    ];
  }
}