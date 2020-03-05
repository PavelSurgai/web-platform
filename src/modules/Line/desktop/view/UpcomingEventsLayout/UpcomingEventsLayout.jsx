import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { UpcomingEvents } from 'features/line/desktop';

export const UpcomingEventsLayout = ({ match }) => {
  const b = block('upcoming-events-layout');
  const { sportID, countryID } = match.params;
  return (
    <div className={b()}>
      <UpcomingEvents
        sportID={+(sportID.split('').filter(temp => +temp === +temp).join(''))}
        countryID={+(countryID.split('').filter(temp => +temp === +temp).join(''))} />
    </div>
  );
};

UpcomingEventsLayout.propTypes = {
  match: PropTypes.object.isRequired,
};