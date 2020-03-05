import React, { useRef } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import sportBackgrounds from '../../img/sportBackgrounds/desktop';
import './FullEventSubHeaderLine.scss';

const FullEventSubHeaderLine = ({ teams, date, sportID, teamIdFirst, teamIdSecond, countryID }) => {
  const b = block('full-event-subheader-line');
  const image = sportBackgrounds[sportID] ? sportBackgrounds[sportID] : sportBackgrounds.default;
  const sourceFirstImg = `https://pitch90bet.com/media/logo/${teamIdFirst}_${countryID}_${sportID}.png`;
  const sourceSecondImg = `https://pitch90bet.com/media/logo/${teamIdSecond}_${countryID}_${sportID}.png`;
  const imgRefFirst = useRef(null);
  const imgRefSecond = useRef(null);
  return (
    <div className={b()}>
      <img src={image} alt="" className={b('background')} />
      <div className={b('content')}>
        <div className={b('main')}>
          <div className={b('left')}>
            <div className={b('logo-wrapper', { type: 'first' })}>
              <img ref={imgRefFirst}
                src={sourceFirstImg}
                onError={() => { imgRefFirst.current.style.display = 'none'; }}
                alt=""
              />
            </div>
            {teams.split(' - ')[0]}
          </div>
          <div className={b('center')}>
            <div className={b('date')}>
              <div>
                {date[0]}
              </div>
              {date[1]}
            </div>
          </div>
          <div className={b('right')}>
            {teams.split(' - ')[1]}
            <div className={b('logo-wrapper', { type: 'second' })}>
              <img ref={imgRefSecond}
                src={sourceSecondImg}
                onError={() => { imgRefSecond.current.style.display = 'none'; }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FullEventSubHeaderLine.propTypes = {
  teams: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  sportID: PropTypes.number.isRequired,
  countryID: PropTypes.number.isRequired,
  teamIdFirst: PropTypes.number.isRequired,
  teamIdSecond: PropTypes.number.isRequired,
};

export default FullEventSubHeaderLine;
