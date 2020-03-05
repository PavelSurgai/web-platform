import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Button from 'components/Button/mobile';
import { menuItems } from 'shared/utils/menuItems';
import { FooterLinks } from './FooterLinks';
import { logos } from '../data';
import './Footer.scss';

const Footer = ({ locale, flatPagesList }) => {
  const b = block('footer');
  const logoItems = logos.map(item => (
    <li className={b('logo-item')} key={item}>
      <img className={b('logo-item-img')} src={item} alt="logo" />
    </li>
  ));
  return (
    <footer className={b()}>
      <div className={b('button-upload')}>
        <div className={b('button')}>
          <Button
            text={locale.support}
            color="blue"
            link="/support"
          />
        </div>
      </div>
      <div className={b('top')}>
        <FooterLinks
          flatPagesList={flatPagesList}
          links={menuItems}
          locale={locale}
        />
      </div>
      <ul className={b('logo-list')}>{logoItems}</ul>
      <div className={b('text')}>
        <p className={b('text-paragraph')}>{locale.footerText1}</p>
        <p className={b('text-paragraph')}>{locale.footerText2}</p>
        <p className={b('text-paragraph')}>{locale.footerText3}</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  locale: PropTypes.object,
  flatPagesList: PropTypes.array.isRequired,
};

export default React.memo(Footer);