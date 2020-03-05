import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import ArrowSVG from '../img/arrow.svg';
import './Paginator.scss';

const Paginator = ({ count, currentPage, locale, onPageClick }) => {
  const b = block('paginator');
  const [isOpen, changeOpen] = useState(false);
  const pagesCount = Math.floor(count / 10);
  let pages = [];
  
  for (let i = 0; i <= pagesCount; i += 1) {
    const isActive = i === currentPage;
    const el = (
      <li
        key={i}
        className={b('page',
          { active: isActive,
            firstActivePage: isActive && i === 0,
            lastActivePage: isActive && i === pagesCount })}
        onClick={isActive ? null : () => onPageClick(i)}
      >
        {`${i + 1} ${isActive ? `(${locale.choosen})` : ''}`}
      </li>
    );
    pages.push(el);
  }
  return (
    <div className={b({ open: isOpen })} onClick={() => changeOpen(!isOpen)}>
      <span className={b('title')}>{`${locale.page}:`}</span>
      <div className={b('pages')}>
        <div className={b('current-page')}>
          <span className={b('current-page-text')}>{currentPage + 1}</span>
          <SVGInline className={b('arrow').toString()} svg={ArrowSVG} />
        </div>
        {isOpen ? <ul className={b('pages-list')}>
          <div className={b('page-title')}>
            {locale.page}
          </div>
          {pages}
          <div className={b('cancel')}>
            {locale.cancel}
          </div>
        </ul> : null}
      </div>
    </div>
  );
};

Paginator.propTypes = {
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  locale: PropTypes.object.isRequired,

  onPageClick: PropTypes.func.isRequired,
};

export default Paginator;
