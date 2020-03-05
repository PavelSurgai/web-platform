import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { FullEventLine } from 'features/fullEvent/mobile';

export const FullEventLineLayout = ({ match }) => {
  const { eventID } = match.params;
  const b = block('full-event-line-layout');
  return (
    <div className={b()}>
      <FullEventLine eventID={+eventID} />
    </div>
  );
};

FullEventLineLayout.propTypes = {
  match: PropTypes.object.isRequired,
};