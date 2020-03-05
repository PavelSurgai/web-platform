import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { FullEventLive } from 'features/fullEvent/desktop';

export const FullEventLiveLayout = ({ match }) => {
  const { eventID } = match.params;
  const b = block('full-event-Live-layout');
  return (
    <div className={b()}>
      <FullEventLive eventID={+eventID} />
    </div>
  );
};

FullEventLiveLayout.propTypes = {
  match: PropTypes.object.isRequired,
};