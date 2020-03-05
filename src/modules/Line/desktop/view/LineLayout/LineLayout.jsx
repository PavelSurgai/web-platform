import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { Line } from 'features/line/desktop';

export const LineLayout = ({ match }) => {
  const { sportID, countryID } = match.params;
  const b = block('favorites-layout');
  return (
    <div className={b()}>
      <Line
        sportID={+(sportID.split('').filter(temp => +temp === +temp).join(''))}
        countryID={+(countryID.split('').filter(temp => +temp === +temp).join(''))} />
    </div>
  );
};

LineLayout.propTypes = {
  match: PropTypes.object.isRequired,
};