import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInlive from 'react-svg-inline';

import Input from 'components/Input/desktop';
import SwitchBox from 'components/SwitchBox/desktop';
import Spinner from 'components/Spinner';

import './OneClick.scss';

const OneClick = ({ changeaamountOneClick, locale, amountOneClick, changeIsOneClick,
  isOneClick, actionProcessing, innerRef }) => {
  const b = block('one-click-block');

  return (
    <div className={b().toString()} ref={innerRef}>
      <Spinner isLoading={actionProcessing} />
      <div className={b('header').toString()}>{locale.oneClick}</div>
      <div className={b('settings')}>
        <div className={b('text')}>{locale.amount}</div>
        <div className={b('input-container')}>
          <div className={b('minus')}
            onClick={() => changeaamountOneClick(amountOneClick >= 50 ? amountOneClick - 50 : 0)} />
          <Input
            value={amountOneClick}
            name="amount"
            type="one-click"
            callBack={e => changeaamountOneClick(e.currentTarget.value)} />
          <div className={b('plus')} onClick={() => changeaamountOneClick(amountOneClick + 50)}>+</div>
        </div>
        <SwitchBox isActive={isOneClick} callBack={changeIsOneClick} />
      </div>
    </div>
  );
};

OneClick.propTypes = {
  locale: PropTypes.object.isRequired,
  amountOneClick: PropTypes.number.isRequired,
  isOneClick: PropTypes.bool.isRequired,
  actionProcessing: PropTypes.bool.isRequired,

  innerRef: PropTypes.object.isRequired,
  changeaamountOneClick: PropTypes.func.isRequired,
  changeIsOneClick: PropTypes.func.isRequired,
};
export default React.forwardRef((props, ref) => <OneClick innerRef={ref} {...props} />);