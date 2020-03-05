import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import './EmptyBasket.scss';

const EmptyContent = ({ locale }) => {
  const b = block('empty-basket');
  return (
    <section className={b()}>{locale.emptyBasketText}</section>
  );
};

EmptyContent.propTypes = {
  locale: PropTypes.object,
};

export default EmptyContent;