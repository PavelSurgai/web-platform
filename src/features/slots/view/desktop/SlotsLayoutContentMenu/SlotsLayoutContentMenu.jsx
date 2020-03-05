import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './SlotsLayoutContentMenu.scss';

const SlotsLayoutContentMenu = ({ menuItems, currentSection, sectionNames, subMenuItems }) => {
  const b = block('slots-layout-content');
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
  const menuItemLinks = menuItems && menuItems.map(item => {
    const isActive = item === currentSection;
    return (
      <Link
        className={b('menu-item', { active: isActive })}
        key={item}
        to={`/slots/${item}`}>
        {sectionNames[item]}
      </Link>
    );
  });

  // menuItemLinks.push(
  //   <span
  //     className={b('menu-item', { active: subMenuItems.indexOf(currentSection) !== -1 })}
  //     key="inbet"
  //     onClick={() => setSubmenuIsOpen(!submenuIsOpen)}>
  //     {'Inbet'}
  //   </span>,
  // );

  const subMenuItemLinks = subMenuItems && subMenuItems.map(item => {
    const isActive = item === currentSection;
    return (
      <Link
        className={b('menu-item', { active: isActive })}
        key={item}
        to={`/slots/${item}`}>
        {sectionNames[item]}
      </Link>
    );
  });
  
  return (
    <React.Fragment>
      <div className={b('menu')}>
        {menuItemLinks}
      </div>
      {
        submenuIsOpen &&
        <div className={b('sub-menu')}>
          {subMenuItemLinks}
        </div>
      }
    </React.Fragment>
  );
};

SlotsLayoutContentMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  subMenuItems: PropTypes.array.isRequired,
  currentSection: PropTypes.string.isRequired,
  sectionNames: PropTypes.object.isRequired,
};

export default SlotsLayoutContentMenu;
