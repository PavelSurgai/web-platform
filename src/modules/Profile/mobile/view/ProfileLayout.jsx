import React from 'react';
import block from 'bem-cn';
import { Route, Switch } from 'react-router-dom';

import { Profile } from 'features/profile/mobile';
import { profileTabs } from '../../data/mobile';
import './ProfileLayout.scss';

export const ProfileLayout = () => {
  const b = block('profile-layout');
  const profileRoutes = profileTabs.map(tab => <Route key={tab.link} path={tab.link} component={tab.component} />);
  return (
    <div className={b()}>
      <Switch>
        {profileRoutes}
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
};