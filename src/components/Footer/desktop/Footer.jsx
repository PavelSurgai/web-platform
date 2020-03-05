import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import { menuItems } from 'shared/utils/menuItems';
import { FooterLinks } from './FooterLinks';
import UpButton from './UpButton';
import { logos, bottomLinks } from '../data';
import './Footer.scss';

const Footer = ({ locale, flatPagesList, innerRef }) => {
  const b = block('footer');
  const logoItems = logos.map(item => (
    <li className={b('logo-item')} key={item}>
      <img className={b('logo-item-img')} src={item} alt="logo" />
    </li>
  ));
  // const bottomLinksItems = bottomLinks.map(item => (
  //   <li className={b('bottom-item')} key={item.id}>
  //     <a className={b('bottom-item-link')} href={item.link} target="_blank">
  //       <SVGInline className={b('bottom-item-icon').toString()} svg={item.icon} />
  //     </a>
  //   </li>
  // ));
  return (
    <footer className={b()} ref={innerRef}>
      <div className={b('wrapper')}>
        <div className={b('top')}>
          <FooterLinks
            flatPagesList={flatPagesList}
            links={menuItems}
            locale={locale}
          />
          <UpButton text={locale.upbutton} />
        </div>
        <div className={b('text')}>
          <p className={b('text-paragraph')}>{locale.footerText1}</p>
          <p className={b('text-paragraph')}>{locale.footerText2}</p>
          <p className={b('text-paragraph')}>{locale.footerText3}</p>
        </div>
        <div className={b('bottom')}>
          {/* <ul className={b('bottom-links')}>{bottomLinksItems}</ul> */}
          <a href="https://www.free-kassa.ru/">
            <img src="https://www.free-kassa.ru/img/fk_btn/17.png" alt="freekassa" />
          </a>
          <span className={b('ages')}>18+</span>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  locale: PropTypes.object,
  flatPagesList: PropTypes.array.isRequired,
  innerRef: PropTypes.object.isRequired,
};

export default React.memo(React.forwardRef((props, ref) => <Footer innerRef={ref} {...props} />));