import React, { useRef } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import TimeSVG from '../../../img/time.svg';
import { getStatisticIcon } from '../../../../data/statisticIcons';
import './FullEventStatisticBLock.scss';

const FullEventStatisticBLock = ({ statisticList, sportID, sportName, tourneyName, time, comment,
  sourceFirstImg, sourceSecondImg, teamNameFirst, teamNameSecond, coefs }) => {
  const b = block('full-event-statistic-block');
  const imgRefFirst = useRef(null);
  const imgRefSecond = useRef(null);
  const itemsList = statisticList.map(temp => (
    <div className={b('column')}>
      <div className={b('data')}>
        {+temp.name !== +temp.name ?
          <img src={getStatisticIcon(temp.name, sportID)} className={b('icon')} alt="" /> : temp.name
        }
      </div>
      <div className={b('data')}>
        {temp.value[0]}
      </div>
      <div className={b('data')}>
        {temp.value[1]}
      </div>
    </div>
  ));
  return (
    <div className={b()}>
      <div className={b('header')}>{`${sportName} - ${tourneyName}`}</div>
      <div className={b('center')}>
        <div className={b('left')}>
          <div className={b('time-block')}>
            <SVGInline svg={TimeSVG} className={b('time-icon')} />
            <div className={b('time')}>{time || comment}</div>
          </div>
          <div className={b('teams')}>
            <div className={b('team')}>
              <img
                ref={imgRefFirst}
                className={b('flag')}
                src={sourceFirstImg}
                alt=""
                onError={() => { imgRefFirst.current.style.opacity = '0'; }}
              />
              <span className={b('team-text')}>{teamNameFirst}</span>
            </div>
            <div className={b('team')}>
              <img
                ref={imgRefSecond}
                className={b('flag')}
                src={sourceSecondImg}
                alt=""
                onError={() => { imgRefSecond.current.style.opacity = '0'; }} />
              <span className={b('team-text')}>{teamNameSecond}</span>
            </div>
          </div>
        </div>
        <div className={b('right')}>
          <div className={b('items')}>
            {itemsList}
          </div>
        </div>
      </div>
    </div>
  );
};

FullEventStatisticBLock.propTypes = {
  statisticList: PropTypes.array.isRequired,
  sportID: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  tourneyName: PropTypes.string.isRequired,
  sportName: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  sourceFirstImg: PropTypes.string.isRequired,
  sourceSecondImg: PropTypes.string.isRequired,
  teamNameFirst: PropTypes.string.isRequired,
  teamNameSecond: PropTypes.string.isRequired,
};

export default FullEventStatisticBLock;
