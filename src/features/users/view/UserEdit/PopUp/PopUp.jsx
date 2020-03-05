import React from 'react';
import block from 'bem-cn';

import './PopUp.scss';

const PopUp = ({ password, id, locale, onClose }) => {
  const b = block('password-pop-up');
  return (
    <div className={b()}>
      <div className={b('body')}>
        <div className={b('header')}>
          {`${locale.theNewPassword} ${locale.for} ${locale.id.toLowerCase()} ${id}`}
        </div>
        <div className={b('password')}>{password}</div>
        <div className={b('button')} onClick={() => onClose(false)}>{locale.ok}</div>
      </div>
    </div>
  );
};

export default PopUp;