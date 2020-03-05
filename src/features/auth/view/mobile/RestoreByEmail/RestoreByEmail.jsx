import React, { useState } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { actions as authActions } from 'features/auth';

import Input from 'components/Input/mobile';
import Button from 'components/Button/mobile';

import './RestoreByEmail.scss';

const RestoreByEmail = ({ location, sendNewPasswordByEmail, history, locale }) => {
  const b = block('restore-email');
  const [pass, setPass] = useState('');
  const [validPass, SetValidPass] = useState('');
  return (
    <div className={b()}>
      <form className={b('form')}
        onSubmit={e => {
          e.preventDefault();
          sendNewPasswordByEmail(pass, location, () => history.push('/line/top-events'));
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
          callBack={e => SetValidPass(e.currentTarget.value)}
          placeholder={locale.confirmPass} />
        <Button type="submit" text={locale.submit} disabled={pass !== validPass || pass === ''} />
      </form>
    </div>
  );
};

RestoreByEmail.propTypes = {
  locale: PropTypes.object.isRequired,
  sendNewPasswordByEmail: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    lang: state.userSettings.lang,
    locale: state.locale.common,
    actionProcessing: state.basket.actionProcessing,

  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    sendNewPasswordByEmail: authActions.sendNewPasswordByEmail,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(RestoreByEmail)));
