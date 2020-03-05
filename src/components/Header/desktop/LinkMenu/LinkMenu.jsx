import React, { useEffect } from 'react';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { topLinks } from '../../data';

// import phoneSvg from '../../img/phone.svg';

import './LinkMenu.scss';

const LinkMenu = ({ locale, getDownloadUrl, downloadUrl }) => {
  const b = block('link-menu');
  useEffect(() => {
    getDownloadUrl();
  }, []);
  // const phoneLink = (
  //   <li className={b('item')} key="phone">
  //     <a className={b('link', { type: 'link' })} href={downloadUrl}>
  //       <SVGInline className={b('link-icon', { type: 'link' }).toString()} svg={phoneSvg} />
  //       {locale.phone}
  //     </a>
  //   </li>
  // );
  const items = topLinks.map(item => (
    <li className={b('item')} key={item.id}>
      {
        item.type === 'href' ?
          <a className={b('link', { type: item.type })} href={item.link} target="_blank" rel="noopener noreferrer">
            <SVGInline className={b('link-icon', { type: item.id }).toString()} svg={item.icon} />
          </a> :
          <Link className={b('link', { type: item.type })} to={item.link}>
            <SVGInline className={b('link-icon', { type: item.id }).toString()} svg={item.icon} />
            <div className={b('link-text')}>{ locale[item.id] }</div>
          </Link>
      }
    </li>
  ));
  const links = [
    items[0],
    phoneLink,
    items.slice(1),
  ];
  return <ul className={b()}>{links}</ul>;
};
LinkMenu.propTypes = {
  locale: PropTypes.object,
  downloadUrl: PropTypes.string.isRequired,
  getDownloadUrl: PropTypes.func.isRequired,

};

export default React.memo(LinkMenu);
