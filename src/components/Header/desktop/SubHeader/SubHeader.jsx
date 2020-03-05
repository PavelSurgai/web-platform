import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SetOddType from 'components/SetOddType/desktop';

import './SubHeader.scss';

export const SubHeader = ({ flatPagesList, setOddType, oddType, locale }) => {
  const b = block('subheader');
  const flatPagesLinks = flatPagesList.map(item => (
    <li className={b('links-list-item')} key={item.idName}>
      <Link className={b('link')} to={`/flatpages/${item.idName}`}>{item.name}</Link>
    </li>
  ));
  return (
    <div className={b()}>
      <nav className={b('nav')}>
      </nav>
      <div className={b('odds-type')}>
        <span className={b('odd-text')}>{`${locale.odd}:`}</span>
        <SetOddType locale={locale} setOddType={setOddType} oddType={oddType} />
      </div>
    </div>
  );
};

SubHeader.propTypes = {
  locale: PropTypes.object,
  flatPagesList: PropTypes.array.isRequired,
  oddType: PropTypes.string.isRequired,

  setOddType: PropTypes.func.isRequired,
};