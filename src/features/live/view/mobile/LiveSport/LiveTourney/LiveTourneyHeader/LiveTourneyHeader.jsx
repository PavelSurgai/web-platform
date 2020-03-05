import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import { getCountryById } from 'shared/utils/countries';
import arrowSvg from '../../../../img/arrow.svg';
import './LiveTourneyHeader.scss';

const LiveTourneyHeader = ({ tourneyName, countryID, sportID, changeOpenedTourney, locale, isOpen, tourneyID }) => {
  const b = block('live-tourney-header');
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

LiveTourneyHeader.propTypes = {
  tourneyName: PropTypes.string.isRequired,
  changeOpenedTourney: PropTypes.func.isRequired,
  countryID: PropTypes.number.isRequired,
  sportID: PropTypes.number.isRequired,
  tourneyID: PropTypes.number.isRequired,
  locale: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
};


export default LiveTourneyHeader;