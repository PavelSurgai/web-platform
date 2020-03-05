import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import { Link } from 'react-router-dom';

import { getCountryById } from 'shared/utils/countries';
import star from '../../../img/favorites-event-star.png';
import activeStar from '../../../img/favorites-event-active-star.png';

import arrowSvg from '../../../img/arrow.svg';
import './TourneyHeader.scss';

const TourneyHeader = ({ tourneyName, countryID,
  changeVisibilityEvents, isOpen, tourneyID, isFavorites }) => {
  const b = block('tourney-header');
  return (
    <div className={b()}>
      <div className={b('title')}>
        {tourneyName}
      </div>
    </div>
  );
};

TourneyHeader.propTypes = {
  tourneyName: PropTypes.string.isRequired,
  changeVisibilityEvents: PropTypes.func.isRequired,
  countryID: PropTypes.number.isRequired,
  tourneyID: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isFavorites: PropTypes.bool,
};


export default TourneyHeader;
