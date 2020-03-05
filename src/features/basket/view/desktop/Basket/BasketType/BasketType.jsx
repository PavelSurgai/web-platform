import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './BasketType.scss';

const BasketType = ({ tempType, types, locale }) => {
  const b = block('basket-type');
  const typeList = Object.values(types).map(temp => (<div key={temp.ID} className={b('element', { active: temp.ID === tempType.ID })}>
    {locale[temp.textID]}
  </div>));
  return (
    <div className={b()}>
      {typeList}
    </div>
  );
};

BasketType.propTypes = {
  tempType: PropTypes.shape({
    ID: PropTypes.number,
    textID: PropTypes.string,
  }).isRequired,
  types: PropTypes.object.isRequired,
  locale: PropTypes.object,
};

export default BasketType;
