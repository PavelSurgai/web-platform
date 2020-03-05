import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { FullEventLive } from 'features/fullEvent/mobile';

import './FullEventLiveLayout.scss';

export const FullEventLiveLayout = ({ match }) => {
  const { eventID } = match.params;
  const b = block('full-event-live-layout');
  return (
    <div className={b()}>
      <FullEventLive eventID={+eventID} />
    </div>
  );
};

FullEventLiveLayout.propTypes = {
  match: PropTypes.object.isRequired,
};