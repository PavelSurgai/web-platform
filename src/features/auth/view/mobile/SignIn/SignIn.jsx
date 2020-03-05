import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackBlock from 'components/BackBlock/mobile';

import HandleLogin from 'components/HandleLogin/mobile';
import Input from 'components/Input/mobile';
import Button from 'components/Button/mobile';
import CheckBox from 'components/CheckBox/mobile';

import { actions as authActions } from '../../../redux';
import './SignIn.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      remember: false,
      handleIsOpen: false,
      phoneRecovery: false,
    };
  }

  static propTypes = {
    signInUniversal: PropTypes.func.isRequired,
    startRecovery: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    sendNewPasswordByPhone: PropTypes.func.isRequired,
    sendPhoneCode: PropTypes.func.isRequired,
    locale: PropTypes.object.isRequired,
    localeCommon: PropTypes.object.isRequired,
  }

  onChangeListener = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  onChangePhoneListener = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  onChangeRemember = value => {
    this.setState({ remember: value });
  }

  onSubmit = e => {
    e.preventDefault();
    const { login, password } = this.state;
    const { signInUniversal } = this.props;
    signInUniversal(login, password, () => this.goHomePageAfterAuth());
  }

  onOpenRecovery = () => {
    this.setState({ handleIsOpen: true });
  }

  render() {
    const b = block('sign-in');
    const { login, password, remember, handleIsOpen, phoneRecovery } = this.state;
    const { locale, startRecovery, handleLogin,
      sendNewPasswordByPhone, sendPhoneCode, localeCommon } = this.props;

    const validation = login.length && password.length;
    return (
      <React.Fragment>
        <BackBlock>
          {handleIsOpen ? locale.recovery : locale.authorization}
        </BackBlock>
        {handleIsOpen ?
          <HandleLogin
            history={history}
            locale={localeCommon}
            callBack={this.setOpenedRecoveryInputs}
            handleLogin={handleLogin}
            sendPhoneCode={sendPhoneCode}
            sendNewPasswordByPhone={sendNewPasswordByPhone}
            phoneRecovery={phoneRecovery}
          /> :
          <form className={b()} onSubmit={this.onSubmit}>
            <div className={b('top-block')}>
              <label>
                <div className={b('title')}>{locale.inputPhone}</div>
                <div className={b('input')}>
                  <Input
                    value={login}
                    name="login"
                    callBack={this.onChangePhoneListener}
                  />
                </div>
              </label>
              <label>
                <div className={b('title')}>{locale.inputPassword}</div>
                <div className={b('input', { last: true })}>
                  <Input
                    value={password}
                    name="password"
                    callBack={this.onChangeListener}
                    type="password"
                  />
                </div>
              </label>
            </div>
            <div className={b('bottom-block')}>
              <div className={b('line')}>
                <div className={b('recovery')}>
                  <Button
                    color="dark-blue"
                    size="low"
                    text={locale.forgotPassword}
                    callBack={this.onOpenRecovery}
                  />
                </div>
              </div>
              <div className={b('button')}>
                <Button
                  type="submit"
                  size="low"
                  text={locale.login}
                  disabled={!validation}
                />
              </div>
            </div>
          </form>}
        {/* <div className={b('not-auth')}>
          {locale.notAuth}
          <Button
            link="/auth/sign-up"
            text={locale.registration} />
        </div> */}
      </React.Fragment>
    );
  }

  setOpenedRecoveryInputs = () => {
    this.setState({ phoneRecovery: true });
  }

  goHomePageAfterAuth = () => this.props.history.push('/');

  _isPhone = str => str === str.match(/(\d|\+)/g);
}

function mapStateToProps(state) {
  return {
    lang: state.userSettings.lang,
    handleIsOpen: state.auth.handleIsOpen,
    locale: state.locale.auth,
    localeCommon: state.locale.common,
    currencies: state.userSettings.currencies,
    loginIsPhone: state.auth.loginIsPhone,
    login: state.auth.login,
    phoneRecovery: state.auth.phoneRecovery,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    signInUniversal: authActions.signInUniversal,
    signUpPhone: authActions.signUpPhone,
    sendRecovery: authActions.sendRecovery,
    startRecovery: authActions.startRecovery,
    handleLogin: authActions.handleLogin,
    sendNewPasswordByPhone: authActions.sendNewPasswordByPhone,
    sendPhoneCode: authActions.sendPhoneCode,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
