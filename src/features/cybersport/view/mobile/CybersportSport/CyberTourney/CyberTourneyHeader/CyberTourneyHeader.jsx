import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import arrowSvg from '../../../../img/arrow.svg';
import './CyberTourneyHeader.scss';

const CyberTourneyHeader = ({ tourneyName, changeOpenedTourney, isOpen, tourneyID }) => {
  const b = block('cyber-tourney-header');
  return (
    <div className={b()} onClick={() => changeOpenedTourney(tourneyID)}>
      <div className={b('title')}>
        {tourneyName}
      </div>
      <div className={b('arrow-box')}>
        <SVGInline className={b('arrow-icon', { closed: !isOpen }).toString()} svg={arrowSvg} />
      </div>
    </div>
  );
};

CyberTourneyHeader.propTypes = {
  tourneyName: PropTypes.string.isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  tourneyID: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
};


export default CyberTourneyHeader;