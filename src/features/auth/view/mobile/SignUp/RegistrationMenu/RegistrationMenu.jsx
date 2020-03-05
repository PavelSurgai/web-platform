import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import './RegistrationMenu.scss';

const RegistrationMenu = ({ items = [], activeType, locale, callBack }) => {
  const b = block('registration-menu');
  const itemList = Object.values(items).map(temp => (
    <div key={temp.type} className={b('item', { active: activeType === temp.type })} onClick={() => callBack(temp.type)}>
      <div className={b('text')}>{locale[temp.textID]}</div>
    </div>
  ));

  return (
    <div className={b()}>
      <div className={b('wrapper')}>
        {itemList}
      </div>
    </div>
  );
};

RegistrationMenu.propTypes = {
  items: PropTypes.shape({
    type: PropTypes.string,
    textID: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
  activeType: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
  locale: PropTypes.object,
};

export default RegistrationMenu;