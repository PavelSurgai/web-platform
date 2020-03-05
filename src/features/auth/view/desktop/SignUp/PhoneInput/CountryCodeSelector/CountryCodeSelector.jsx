import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import testImg from './img/russia.png';
import './CountryCodeSelector.scss';

const CountryCodeSelector = ({ itemsList, activeValue, callBack }) => {
  const [isOpen, setOpen] = useState(false);
  const b = block('country-code-selector');
  const optionsList = itemsList.map(temp => activeValue !== temp && (
    <div key={temp} className={b('item')} onClick={() => callBack(temp)}>
      <img className={b('image')} src={testImg} alt="" />
      {temp}
    </div>
  ));

  const changeOpened = () => setOpen(!isOpen);

  return (
    <div className={b()} onClick={changeOpened}>
      <div className={b('active-item', { opened: isOpen ? 'open' : 'close' })}>
        <img className={b('image')} src={testImg} alt="" />
        {itemsList.find(temp => activeValue === temp)}
      </div>
      <div className={b('additional-items')}>
        {isOpen && optionsList}
      </div>
    </div>
  );
};

CountryCodeSelector.propTypes = {
  itemsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeValue: PropTypes.string.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default CountryCodeSelector;