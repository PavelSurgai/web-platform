import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import CheckBox from 'components/CheckBox/mobile';

import './TotoItem.scss';

const TotoItem = ({ item, callBack, selectedRates }) => {
  const b = block('toto-item');
  const { sportName, date, teams, tourneyName } = item;

  return (
    <div className={b().toString()}>
      <div className={b('info-block').toString()}>
        <div className={b('title').toString()}>
          <div className={b('text').toString()}>{`${sportName} - ${teams}`}</div>
        </div>
      </div>
      <div className={b('checkbox-block')}>
        <div className={b('outcome', { selected: selectedRates[item.ID] === '1' }).toString()} onClick={() => callBack(item.ID, '1')}>1</div>
        <div className={b('outcome', { selected: selectedRates[item.ID] === 'X' }).toString()} onClick={() => callBack(item.ID, 'X')}>X</div>
        <div className={b('outcome', { selected: selectedRates[item.ID] === '2' }).toString()} onClick={() => callBack(item.ID, '2')}>2</div>
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