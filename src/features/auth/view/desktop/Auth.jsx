import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { actions as authActions } from '../../redux';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import './Auth.scss';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignIn: true,
    };
  }

  static propTypes = {
    locale: PropTypes.object,
    lang: PropTypes.string.isRequired,
    isSignIn: PropTypes.bool.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    actionProcessing: PropTypes.bool.isRequired,

    startRecovery: PropTypes.func.isRequired,
    sendToPhoneCode: PropTypes.func.isRequired,
    signInUniversal: PropTypes.func.isRequired,
    signUpByEmail: PropTypes.func.isRequired,
    signUpPhone: PropTypes.func.isRequired,
    signUpOneClick: PropTypes.func.isRequired,
    handleAuthModal: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.setState({ isSignIn: this.props.isSignIn });
  }

  render() {
    const b = block('auth');
    const { locale, lang, sendToPhoneCode, signUpByEmail, signUpOneClick, signUpPhone, currencies,
      actionProcessing, history, signInUniversal, startRecovery, handleAuthModal } = this.props;
    const { isSignIn } = this.state;
    return (
      <div className={b()}>
        <div className={b('switcher')}>
          <div
            className={b('switch-item', { active: !isSignIn })}
            onClick={() => this.switchAuthType(false)}
          >
            {locale.registration}
          </div>
          <div
            className={b('switch-item', { active: isSignIn })}
            onClick={() => this.switchAuthType(true)}
          >
            {locale.authorization}
          </div>
        </div>
        <div className={b('content')}>
          {isSignIn ?
            <div className={b('sign-in')}>
              <SignIn
                locale={locale}
                history={history}
                signInUniversal={signInUniversal}
                startRecovery={startRecovery}
                actionProcessing={actionProcessing}
              />
            </div> :
            <div className={b('sign-up')}>
              <SignUp
                locale={locale}
                sendToPhoneCode={sendToPhoneCode}
                signUpByEmail={signUpByEmail}
                signUpOneClick={signUpOneClick}
                signUpPhone={signUpPhone}
                currencies={currencies}
                actionProcessing={actionProcessing}
                handleAuthModal={handleAuthModal}
              />
            </div>
          }
        </div>
      </div>
    );
  }

  switchAuthType = value => this.setState({ isSignIn: value });
}

function mapStateToProps(state) {
  return {
    lang: state.userSettings.lang,
    locale: state.locale.auth,
    currencies: state.userSettings.currencies,
    actionProcessing: state.auth.actionProcessing,
    loginIsPhone: state.auth.loginIsPhone,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    sendToPhoneCode: authActions.sendToPhoneCode,
    handleAuthModal: authActions.handleAuthModal,
    signUpByEmail: authActions.signUpByEmail,
    signUpOneClick: authActions.signUpOneClick,
    signUpPhone: authActions.signUpPhone,
    signInUniversal: authActions.signInUniversal,
    startRecovery: authActions.startRecovery,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
