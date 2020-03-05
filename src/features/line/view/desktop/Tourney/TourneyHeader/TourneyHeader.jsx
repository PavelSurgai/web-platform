import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import { getCountryById } from 'shared/utils/countries';
import starSvg from '../../../img/star.svg';
import arrowSvg from '../../../img/arrow.svg';
import './TourneyHeader.scss';

const TourneyHeader = ({ tourneyName, countryID, sportName, changeVisibilityEvents, locale, isOpen, tourneyID }) => {
  const b = block('tourney-header');
  const betNames = locale.betNames.map((temp, index) => (
    <div key={index} className={b('bet-name')}>
      {temp}
    </div>
  ));
  return (
    <div className={b()} onClick={() => changeVisibilityEvents(tourneyID)}>
      <div className={b('title')} title={`${sportName} - ${tourneyName}`}>
        <SVGInline className={b('icon').toString()} svg={getCountryById(countryID)} />
        <span className={b('text')}>{`${sportName} - ${tourneyName}`}</span>
      </div>
      {isOpen && betNames}
      <div className={b('arrow-box')}>
        <SVGInline className={b('arrow-icon', { closed: !isOpen }).toString()} svg={arrowSvg} />
      </div>
    </div>
  );
};

TourneyHeader.propTypes = {
  tourneyName: PropTypes.string.isRequired,
  changeVisibilityEvents: PropTypes.func.isRequired,
  countryID: PropTypes.number.isRequired,
  tourneyID: PropTypes.number.isRequired,
  locale: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  sportName: PropTypes.string.isRequired,
};


export default TourneyHeader;