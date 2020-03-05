import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ProfileLinks.scss';

export const ProfileLinks = ({ locale, links, flatPagesList }) => {
  const b = block('profile-links');

  const linksItems = links.map(item => (
    <div className={b('links-list-item')} key={item.textIdent}>
      <Link className={b('link')} to={item.link}>{locale[item.textIdent]}</Link>
    </div>
  ));
  const flatPagesItems = flatPagesList.map(item => (
    <div className={b('links-list-item')} key={item.idName}>
      <Link className={b('link')} to={`/flatPages/${item.idName}`}>{item.name}</Link>
    </div>
  ));

  return (
    <>
      <nav className={b()}>
        {[...linksItems, ...flatPagesItems]}
      </nav>
      <div className={b('container-fk')}>
        <a className={b('freekassa')} href="https://www.free-kassa.ru/">
          <img src="https://www.free-kassa.ru/img/fk_btn/17.png" alt="freekassa" />
        </a>
      </div>
    </>
  );
};

ProfileLinks.propTypes = {
  locale: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  flatPagesList: PropTypes.array.isRequired,
};