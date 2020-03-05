import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { sectionNames } from 'shared/utils/slots/inbet';

import './SlotsProviderMenu.scss';

const SlotsProviderMenu = ({ menuItems, currentSection, locale, callBack }) => {
  const b = block('slots-provider-menu');
  const itemsList = menuItems.map(t => <div className={b('item', { active: currentSection === t })} onClick={() => callBack(t)}>
    {t}
  </div>);
  
  return (
    <div className={b()}>
      {itemsList}
    </div>
  );
};

SlotsProviderMenu.propTypes = {
  locale: PropTypes.object.isRequired,
  menuItems: PropTypes.array.isRequired,
  currentSection: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default SlotsProviderMenu;
