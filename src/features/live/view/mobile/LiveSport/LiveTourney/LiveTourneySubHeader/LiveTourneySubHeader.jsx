import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './LiveTourneySubHeader.scss';

const LiveTourneySubHeader = ({ locale }) => {
  const b = block('live-tourney-sub-header');
  const betNames = locale.betShortName.map((temp, index) => (<div key={index} className={b('coef-name')}>
    {temp}
  </div>));
  return (
    <div className={b()}>
      <div className={b('coefs')}>
        {betNames}
      </div>
    </div>
  );
};

LiveTourneySubHeader.propTypes = {
  locale: PropTypes.object,
};


export default LiveTourneySubHeader;
