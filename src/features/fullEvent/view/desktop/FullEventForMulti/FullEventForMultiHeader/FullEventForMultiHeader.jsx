import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { getCountryById } from 'shared/utils/countries';
import zoneSvg from '../../../img/zone.svg';
import removeSvg from '../../../img/remove.svg';
import './FullEventForMultiHeader.scss';

const FullEventForMultiHeader = ({ sportName, tourneyName, countryID, removeEvent }) => {
  const b = block('full-event-multi-header');
  return (
    <div className={b()}>
      <SVGInline svg={getCountryById(countryID)} className={b('image-flag').toString()} />
      {`${sportName} - ${tourneyName}`}
      <div className={b('zone-button')}>
        <SVGInline svg={zoneSvg} className={b('zone-image').toString()} />
      </div>
      <div className={b('remove-button')}>
        <SVGInline svg={removeSvg} className={b('remove-image').toString()} onClick={() => removeEvent()} />
      </div>
    </div>
  );
};

FullEventForMultiHeader.propTypes = {
  sportName: PropTypes.string.isRequired,
  tourneyName: PropTypes.string.isRequired,
  countryID: PropTypes.number.isRequired,
  removeEvent: PropTypes.func.isRequired,
};

export default FullEventForMultiHeader;
