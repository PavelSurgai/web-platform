import React, { useMemo, useCallback } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import { getCountryById } from 'shared/utils/countries';
import arrow from '../../../img/arrow.svg';
import './CountryItem.scss';

const CountryItemComponent = ({ text, id, sportID, count, filterValue }) => {
  const b = block('country-item');
  const onTopUpClick = useCallback(() => {
    const app = document.getElementsByClassName('app')[0];
    if (app.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      app.scrollBy(0, -30);
      setTimeout(onTopUpClick, 5);
    }
  }, []);

  const svg = useMemo(() => getCountryById(id), [id]);
  
  return (
    <React.Fragment>
      <li className={b()} onClick={onTopUpClick}>
        <NavLink
          className={b('link').toString()}
          to={`/line/sport${sportID}/country${id}/${filterValue}`}
          activeClassName={b('link', { active: true }).toString()}
        >
          <SVGInline className={b('icon').toString()} svg={svg} />
          <span className={b('text')}>{text}</span>
          <span className={b('count')}>{count}</span>
          <SVGInline svg={arrow} className={b('arrow').toString()} />
        </NavLink>
      </li>
    </React.Fragment>
  );
};

CountryItemComponent.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  sportID: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  filterValue: PropTypes.number.isRequired,
};

const MemoCountryItem = React.memo(CountryItemComponent);

export { MemoCountryItem as CountryItem };
