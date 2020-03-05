import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import CheckBox from 'components/CheckBox/desktop';

import './TotoItem.scss';

const TotoItem = ({ item, callBack, selectedRates }) => {
  const b = block('toto-item');
  const { sportName, date, teams, tourneyName } = item;

  return (
    <div className={b().toString()}>
      <div className={b('info-block').toString()}>
        <div className={b('title').toString()}>
          <div className={b('text').toString()}>{`${sportName} - ${tourneyName}. ${teams}`}</div>
        </div>
      </div>
      <div className={b('checkbox-block')}>
        <label className={b('first-team').toString()}>
          <CheckBox checked={selectedRates[item.ID] === '1'} callBack={() => callBack(item.ID, '1')}  name="isAccept"/>
        </label>
        <label className={b('draw').toString()}>
          <CheckBox checked={selectedRates[item.ID] === 'X'} callBack={() => callBack(item.ID, 'X')}  name="isAccept" />
        </label>
        <label className={b('second-team').toString()}>
          <CheckBox checked={selectedRates[item.ID] === '2'} callBack={() => callBack(item.ID, '2')} name="isAccept" />
        </label>
      </div>
    </div>
  );
};

TotoItem.propTypes = {
  item: PropTypes.object.isRequired,
  selectedRates: PropTypes.object.isRequired,

  callBack: PropTypes.func.isRequired,
};

export default TotoItem;