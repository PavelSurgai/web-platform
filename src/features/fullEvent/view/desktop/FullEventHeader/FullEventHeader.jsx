import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { getCountryById } from 'shared/utils/countries';
import zoneSvg from '../../img/zone.svg';
import './FullEventHeader.scss';

const FullEventHeader = ({ sportName, tourneyName, countryID }) => {
  const b = block('full-event-header');
  return (
    <div className={b()}>
      <SVGInline svg={getCountryById(countryID)} className={b('image-flag').toString()} />
      {`${sportName} - ${tourneyName}`}
      <div className={b('zone-button')}>
        <SVGInline svg={zoneSvg} className={b('zone-image').toString()} />
      </div>
    </div>
  );
};

FullEventHeader.propTypes = {
  sportName: PropTypes.string.isRequired,
  tourneyName: PropTypes.string.isRequired,
  countryID: PropTypes.number.isRequired,
};

export default FullEventHeader;
