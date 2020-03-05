import React, { useRef } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import Button from 'components/Button/desktop';

import './OneClickModal.scss';

const OneClickModal = ({ email, password, locale, localeCommon, closeFunction, copiedAuthInfo }) => {
  const b = block('one-click-modal');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const copy = () => {
    const range = document.createRange();
    range.setStartBefore(emailRef.current);
    range.setEndAfter(passwordRef.current);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    copiedAuthInfo();
  };
  return (
    <div className={b()}>
      <span className={b('header')}>{locale.registration}</span>
      <div className={b('main')}>
        <span className={b('reg-success')}>{locale.successReg}</span>
        <span className={b('reg-dont-forget-save')}>{locale.dontForgetSave}</span>
        <div className={b('reg-info')}>
          <div className={b('reg-info-item')} ref={emailRef}>
            <span className={b('reg-info-label')}>{`${locale.email}: `}</span>
            <span className={b('reg-info-value')}>{email}</span>
          </div>
          <div className={b('reg-info-item')} ref={passwordRef}>
            <span className={b('reg-info-label')}>{`${locale.password}: `}</span>
            <span className={b('reg-info-value')}>{password}</span>
          </div>
        </div>
        <span className={b('copy')} onClick={copy}>{localeCommon.copy}</span>
        <div className={b('button')}>
          <Button
            text="OK"
            callBack={closeFunction}
            size="low" />
        </div>
      </div>
    </div>
  );
};

OneClickModal.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  locale: PropTypes.object.isRequired,
  localeCommon: PropTypes.object.isRequired,

  closeFunction: PropTypes.func.isRequired,
  copiedAuthInfo: PropTypes.func.isRequired,
};

export default OneClickModal;
