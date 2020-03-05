import React, { useState, useRef } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import Button from 'components/Button/mobile';

import logo from 'features/auth/img/logoOneClick.svg';
import copyIcon from 'features/auth/img/copy.svg';

import './OneClickModal.scss';

const OneClickModal = ({ email, password, locale, localeCommon, closeFunction, copiedAuthInfo }) => {
  const b = block('one-click-modal');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const range = document.createRange();
    range.setStartBefore(emailRef.current);
    range.setEndAfter(passwordRef.current);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    setCopied(true);
    copiedAuthInfo();
  };
  return (
    <div className={b()}>
      <div className={b('wrapper')}>
        <div className={b('top-block')}>
          <div className={b('logo-container')}>
            <SVGInline svg={logo} className={b('logo')} />
          </div>
          <div className={b('thank-you')}>{locale.thankYou}</div>
        </div>
        <div className={b('reg-info')}>
          <div className={b('reg-info-item')} ref={emailRef}>
            <span className={b('reg-info-label')}>{`${locale.email}:`}</span>
            <span className={b('reg-info-value')}>{email}</span>
          </div>
          <div className={b('reg-info-item')} ref={passwordRef}>
            <span className={b('reg-info-label')}>{`${locale.password}: `}</span>
            <span className={b('reg-info-value')}>{password}</span>
          </div>
        </div>
        <div className={b('buttons')}>
          <div className={b('button')}>
            <Button
              text={localeCommon.copy}
              callBack={copy}
              size="low" />
          </div>
          <div className={b('button')}>
            <Button
              text="OK"
              size="low"
              color="dark-blue"
              callBack={closeFunction}
            />
          </div>
        </div>
      </div >
    </div >
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
