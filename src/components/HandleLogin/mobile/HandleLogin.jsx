import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Input from 'components/Input/mobile';
import Button from 'components/Button/mobile';

import './HandleLogin.scss';

const HandleLogin = ({ history, locale, handleLogin, phoneRecovery, sendNewPasswordByPhone, callBack }) => {
  const b = block('handle-login');
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [validPass, setValidPass] = useState('');
  const [code, setCode] = useState('');
  return (
    <div className={b().toString()}>
      {!phoneRecovery ?
        <form className={b('form')}
          onSubmit={e => {
            e.preventDefault();
            handleLogin(login, callBack);
          }}>
          <div className={b('top-block')}>
            <div className={b('group')}>
              <div className={b('title')}>{locale.enterLogin}</div>
              <Input
                value={login}
                name="amount"
                type="text"
                callBack={e => setLogin(e.currentTarget.value)}
              />
            </div>
            <div className={b('text')}>{locale.recoveryDescription}</div>
          </div>
          <div className={b('bottom-block')}>
            <Button color="dark-blue" type="submit" text={locale.continue} />
          </div>
        </form> :
        <form className={b('form')}
          onSubmit={e => {
            e.preventDefault();
            sendNewPasswordByPhone(login, pass, code);
          }}>
          <div className={b('top-block')}>
            <div className={b('group')}>
              <div className={b('title')}>{locale.newPass}</div>
              <Input
                value={pass}
                name="amount"
                type="password"
                callBack={e => setPass(e.currentTarget.value)}
              />
            </div>
            <div className={b('group')}>
              <div className={b('title')}>{locale.confirmPass}</div>
              <Input
                value={validPass}
                name="amount"
                type="password"
                callBack={e => setValidPass(e.currentTarget.value)}
               />
            </div>
            <div className={b('group')}>
              <div className={b('title')}>{locale.phoneCode}</div>
              <Input
                value={code}
                name="amount"
                type="text"
                callBack={e => setCode(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className={b('bottom-block')}>
            <Button
              type="submit"
              text={locale.save}
              disabled={pass !== validPass || pass === '' || code === ''} />
          </div>
        </form>
      }
    </div>
  );
};

HandleLogin.propTypes = {
  locale: PropTypes.object.isRequired,
  history: PropTypes.object,
  handleLogin: PropTypes.func.isRequired,
  sendNewPasswordByPhone: PropTypes.func.isRequired,
  phoneRecovery: PropTypes.bool.isRequired,
  callBack: PropTypes.func.isRequired,
};

export default HandleLogin;