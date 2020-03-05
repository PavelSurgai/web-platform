import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BackBlock from 'components/BackBlock/mobile';

import RegistrationMenu from './RegistrationMenu/RegistrationMenu';
import registrationMenuItems from '../../../data/registrationMenuItems';
import SocialRegistration from './SocialRegistration/SocialRegistration';
import EmailRegistration from './EmailRegistration/EmailRegistration';
import OneClickRegistration from './OneClickRegistration/OneClickRegistration';
import PhoneRegistration from './PhoneRegistration/PhoneRegistration';

import { actions as authActions } from '../../../redux';

import './SignUp.scss';

class SignUp extends React.Component {
  state = { activeType: registrationMenuItems.PHONE.type }

  static propTypes = {
    locale: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    codeWasSended: PropTypes.bool.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    sendToPhoneCode: PropTypes.func.isRequired,
    signUpByEmail: PropTypes.func.isRequired,
    signUpOneClick: PropTypes.func.isRequired,
    signUpPhone: PropTypes.func.isRequired,
  }

  render() {
    const b = block('sign-up');
    const { locale, sendToPhoneCode, signUpByEmail, signUpOneClick, signUpPhone, currencies, codeWasSended } = this.props;
    const { activeType } = this.state;
    let tempRegistrationComponent;
    switch (activeType) {
      case registrationMenuItems.PHONE.type: {
        tempRegistrationComponent = (
          <PhoneRegistration
            locale={locale}
            callback={this.goHomePageAfterAuth}
            sendToPhoneCode={sendToPhoneCode}
            signUpPhone={signUpPhone}
            codeWasSended={codeWasSended}
            currencies={currencies} />
        );
        break;
      }
      // case registrationMenuItems.EMAIL.type: {
      //   tempRegistrationComponent = (
      //     <EmailRegistration
      //       callback={this.goHomePageAfterAuth}
      //       locale={locale}
      //       signUpByEmail={signUpByEmail}
      //       currencies={currencies} />
      //   );
      //   break;
      // }
      // case registrationMenuItems.ONE_CLICK.type: {
      //   tempRegistrationComponent = (
      //     <OneClickRegistration
      //       callback={this.goHomePageAfterAuth}
      //       locale={locale}
      //       signUpOneClick={signUpOneClick}
      //       currencies={currencies} />
      //   );
      //   break;
      // }
      default: {
        break;
      }
    }

    return (
      <React.Fragment>
        <BackBlock>
          {locale.registration}
        </BackBlock>
        <article className={b()}>
          <div className={b('menu')}>
            <RegistrationMenu
              items={registrationMenuItems}
              activeType={activeType}
              locale={locale}
              callBack={this.changeActiveType} />
          </div>
          {tempRegistrationComponent}
        </article>
      </React.Fragment>
    );
  }

  goHomePageAfterAuth = () => this.props.history.push('/');

  changeActiveType = type => this.setState({ activeType: type })
}

function mapStateToProps(state) {
  return {
    codeWasSended: state.auth.codeWasSended,
    lang: state.userSettings.lang,
    locale: state.locale.auth,
    currencies: state.userSettings.currencies,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    sendToPhoneCode: authActions.sendToPhoneCode,
    signUpByEmail: authActions.signUpByEmail,
    signUpOneClick: authActions.signUpOneClick,
    signUpPhone: authActions.signUpPhone,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
