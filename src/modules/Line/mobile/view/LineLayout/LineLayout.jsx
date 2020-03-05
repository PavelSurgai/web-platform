import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';

import { CountryMenu, SportMenu } from 'features/sportMenu/mobile';
import { TopEvents } from 'features/line/mobile';
import { TourneyLayout } from '../TourneyLayout/TourneyLayout';

const LineLayout = ({ location: { pathname } }) => {
  const b = block('line-layout');
  return (
    <div className={b()}>
      <Switch>
        <Route exact path="/line" component={SportMenu} />
        <Route path="/line/sport:sportID/country:countryID/:filterTime" component={TourneyLayout} />
        <Route path="/line/sport:sportID" component={CountryMenu} />
        <Route path="/line/top-events" component={TopEvents} />
      </Switch>
    </div>
  );
};

LineLayout.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(LineLayout);
