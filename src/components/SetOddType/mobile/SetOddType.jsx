import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import { oddsTypes } from 'features/userSettings/redux/data/odds';

import BottomPopUp from 'components/BottomPopUp';
import PopUpButton from 'components/PopUpButton';

import './SetOddType.scss';

const SetOddType = ({ closeFunction, locale, oddType, setOddType }) => {
  const b = block('set-odd-type');
  const odds = Object.keys(oddsTypes).map(key => {
    const odd = oddsTypes[key];
    const isActive = oddType === odd.name;
    return (
      <li
        key={odd.id}
        className={b('odd', { active: isActive })}
        onClick={isActive ? null : () => {
          setOddType(odd.name);
          closeFunction();
        }}>
        {locale[odd.name]}
      </li>
    );
  });
  return (
    <BottomPopUp closeFunction={closeFunction}>
      <div className={b()}>
        <h4 className={b('title')}>{locale.chooseOddType}</h4>
        <ul className={b('odds-list')}>{odds}</ul>
        <PopUpButton
          text={locale.cancel}
          onClick={closeFunction}
        />
      </div>
    </BottomPopUp>
  );
};

SetOddType.propTypes = {
  locale: PropTypes.object.isRequired,
  oddType: PropTypes.string.isRequired,
  closeFunction: PropTypes.func.isRequired,
  setOddType: PropTypes.func.isRequired,
};

export default SetOddType;
