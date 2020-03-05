import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import Button from 'components/Button/desktop';
import { CountryItem } from '../CountryItem';
import ArrowSVG from '../../img/arrow.svg';
import './SportItem.scss';

export const SportItem = props => {
  const b = block('sport-item');
  const onTopUpClick = () => {
    const app = document.getElementsByClassName('app')[0];
    if (app.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      app.scrollBy(0, -30);
      setTimeout(onTopUpClick, 5);
    }
  };
  const [count, setCount] = useState(10);
  const { text, id, isCollapsed, collapseSport,
    countries, locale, countriesLoading, img, color } = props;
  const countriesLength = countries.length;
  const items = countries.map(country => <CountryItem
    key={country.ID}
    sportID={id}
    count={country.Count}
    text={country.Name}
    id={country.ID}
  />);
  const reducedItems = items.slice(0, count);
  return (
    <li className={b({ collapsed: isCollapsed, color })} onClick={() => onTopUpClick()}>
      <div className={b('sport')} onClick={() => collapseSport(id)}>
        <div className={b('sport-left')}>
          <img className={b('sport-img')} src={img} alt={text} />
        </div>
        <span className={b('sport-text')}>{text}</span>
        <div className={b('sport-arrow')}>
          <SVGInline className={b('sport-arrow-icon').toString()} svg={ArrowSVG} />
        </div>
      </div>
      {isCollapsed ? <React.Fragment>
        <ul className={b('contries')}>
          {!countriesLoading ? reducedItems : `${locale.loading}...`}
        </ul>
        {countriesLength > 10 && <div className={b('reduce-button')}>
          <Button
            text={count < countriesLength ? locale.showAll : locale.collapse}
            callBack={() => setCount(count < countriesLength ? countriesLength : 10)}
          />
        </div>}
      </React.Fragment> : ''}
    </li>
  );
};

SportItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired,
  countriesLoading: PropTypes.bool.isRequired,
  img: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,

  collapseSport: PropTypes.func.isRequired,
};