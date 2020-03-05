import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import Input from 'components/Input/desktop';
import Button from 'components/Button/desktop';

import './HandleLogin.scss';

const HandleLogin = ({ locale, handleLogin, phoneRecovery, sendNewPasswordByPhone }) => {
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
            handleLogin(login, () => history.push('/line/top-events'));
          }}>
          <Input
            value={login}
            name="amount"
            type="text"
            callBack={e => setLogin(e.currentTarget.value)}
            placeholder={locale.enterLogin} />
          <Button type="submit" text={locale.continue} />
        </form> :
        <form className={b('form')}
          onSubmit={e => {
            e.preventDefault();
            sendNewPasswordByPhone(login, pass, code);
          }}>
          <Input
            value={pass}
            name="amount"
            type="password"
            callBack={e => setPass(e.currentTarget.value)}
            placeholder={locale.newPass} />
          <Input
            value={validPass}
            name="amount"
            type="password"
            callBack={e => setValidPass(e.currentTarget.value)}
            placeholder={locale.confirmPass} />
          <Input
            value={code}
            name="amount"
            type="text"
            callBack={e => setCode(e.currentTarget.value)}
            placeholder={locale.phoneCode} />
          <Button
            type="submit"
            text={locale.continue} 
            disabled={pass !== validPass || pass === '' || code === ''} />
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
};

export default HandleLogin;