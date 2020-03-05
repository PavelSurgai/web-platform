import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { Line } from 'features/line/mobile';

export const TourneyLayout = ({ match }) => {
  const { sportID, countryID, filterTime } = match.params;
  const b = block('favorites-layout');
  return (
    <div className={b()}>
      <Line
        sportID={+(sportID.split('').filter(temp => +temp === +temp).join(''))}
        countryID={+(countryID.split('').filter(temp => +temp === +temp).join(''))}
        filterTime={+filterTime} />
    </div>
  );
};

TourneyLayout.propTypes = {
  match: PropTypes.object.isRequired,
};
