import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';

import LogoSVG from '../../../img/logo.svg';
import RemoveSVG from '../../../img/remove-icon.svg';
import './BasketType.scss';

const BasketType = ({ tempType, types, locale, onRemoveClick }) => {
  const b = block('basket-type');

  return (
    <div className={b()}>
      <div className={b('frame')}>
        <span className={b('type')}>{locale[tempType.textID]}</span>
      </div>
      <div className={b('frame')} />
      <div className={b('frame')}>
        <SVGInline
          className={b('remove')}
          svg={RemoveSVG}
          onClick={onRemoveClick}
        />
      </div>
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

  onRemoveClick: PropTypes.func.isRequired,
};

export default BasketType;
