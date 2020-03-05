import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import arrowSVG from '../img/arrow.svg';

import ProfileTab from '../ProfileTab';

import './ProfileBlock.scss';

const ProfileBlock = ({ item, header, isAuth, locale }) => {
  const b = block('profile-block');
  const [isOpen, changeOpened] = useState(true);
  const tabs = item.links.map((link, index) => isAuth ?
    <ProfileTab
      key={index}
      item={link}
      locale={locale}
    /> : !link.hideNonAuth && <ProfileTab
      key={item.link}
      item={link}
      locale={locale} />);
  return (
    <div className={b()}>
      <div className={b('header')} onClick={() => changeOpened(!isOpen)}>
        {header}
        <SVGInline svg={arrowSVG} className={b('arrow', { opened: isOpen }).toString()} />
      </div>
      {isOpen && tabs}
    </div>
  );
};

ProfileBlock.propTypes = {
  item: PropTypes.object.isRequired,
  header: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired,

  locale: PropTypes.object.isRequired,
};

export default ProfileBlock;