import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import arrowSvg from '../../../../img/arrow.svg';
import './CyberTourneyHeader.scss';

const CyberTourneyHeader = ({ tourneyName, changeOpenedTourney, locale, isOpen, tourneyID }) => {
  const b = block('cyber-tourney-header');
  const betNames = locale.betNames.map((temp, index) => (
    <div key={index} className={b('bet-name')}>
      {temp}
    </div>
  ));
  return (
    <div className={b()} onClick={() => changeOpenedTourney(tourneyID)}>
      <div className={b('title')}>
        <span className={b('title-tourney')} title={tourneyName}>{tourneyName}</span>
      </div>
      {isOpen && betNames}
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
  locale: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
};


export default CyberTourneyHeader;