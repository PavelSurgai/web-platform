import React from 'react';
import block from 'bem-cn';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './FooterLinks.scss';

export const FooterLinks = ({ flatPagesList, links, locale }) => {
  const onTopUpClick = () => {
    const app = document.getElementsByClassName('app')[0];
    if (app.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      app.scrollBy(0, -30);
      setTimeout(onTopUpClick, 5);
    }
  };
  const b = block('footer-links');
  const linksItems = links.map(item => (
    <div className={b('links-list-item')} key={item.textIdent} onClick={() => onTopUpClick()}>
      <Link className={b('link')} to={item.link}>{locale[item.textIdent]}</Link>
    </div>
  ));
  const flatPagesItems = flatPagesList.map(item => (
    <div className={b('links-list-item')} key={item.idName} onClick={() => onTopUpClick()}>
      <Link className={b('link')} to={`/flatPages/${item.idName}`}>{item.name}</Link>
    </div>
  ));

  return (
    <nav className={b()}>
      {[...linksItems, ...flatPagesItems]}
    </nav>
  );
};

FooterLinks.propTypes = {
  flatPagesList: PropTypes.array.isRequired,
  links: PropTypes.array.isRequired,
  locale: PropTypes.object.isRequired,
};