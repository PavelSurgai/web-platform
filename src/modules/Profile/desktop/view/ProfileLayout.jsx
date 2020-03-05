import React from 'react';
import block from 'bem-cn';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ProfileMenu } from 'features/profile/desktop';
import { profileTabs } from '../../data/desktop';
import './ProfileLayout.scss';

const ProfileLayout = ({ locale, isAuth, history }) => {
  const b = block('profile-layout');
  const routes = Object.values(profileTabs).map(item => <Route
    path={item.route}
    key={item.name}
    component={item.component}
  />);
  if (!isAuth) history.push('/');
  return (
    <section className={b()}>
      <header className={b('header')}>
        <h3 className={b('caption')}>{locale.lk}</h3>
      </header>
      <main className={b('main')}>
        <ProfileMenu locale={locale} tabs={profileTabs} />
        <div className={b('content')}>
          <Switch>{routes}</Switch>
        </div>
      </main>
    </section>
  );
};

ProfileLayout.propTypes = {
  locale: PropTypes.object,
  history: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.profile,
    isAuth: state.auth.isAuth,
  };
}

export default connect(mapStateToProps)(withRouter(React.memo(ProfileLayout)));
