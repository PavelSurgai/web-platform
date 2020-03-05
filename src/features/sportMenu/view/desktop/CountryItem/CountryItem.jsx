import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import { getCountryById } from 'shared/utils/countries';
import './CountryItem.scss';

export const CountryItem = ({ text, id, sportID, count }) => {
  const b = block('country-item');
  const onTopUpClick = () => {
    const app = document.getElementsByClassName('app')[0];
    if (app.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      app.scrollBy(0, -30);
      setTimeout(onTopUpClick, 5);
    }
  };
  const svg = getCountryById(id);
  return (
    <li className={b()} onClick={() => onTopUpClick()}>
      <NavLink
        className={b('link').toString()}
        to={`/line/sport${sportID}/country${id}`}
        activeClassName={b('link', { active: true }).toString()}
      >
        <SVGInline className={b('flag').toString()} svg={svg} />
        <span className={b('text')}>{text}</span>
        <span className={b('count')}>{count}</span>
      </NavLink>
    </li>
  );
};

CountryItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  sportID: PropTypes.number.isRequired,
};