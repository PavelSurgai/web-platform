import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import coupon from '../../../img/coupon.svg';

import './BasketHeader.scss';

const BasketHeader = ({ locale }) => {
  const b = block('basket-header');
  return (
    <div className={b()}>
      <SVGInline svg={coupon} className={b('img').toString()} />
      <div className={b('vertical-line')} />
      {locale.myCoupons}
    </div>
  );
};

BasketHeader.propTypes = {
  locale: PropTypes.object,
};

export default BasketHeader;