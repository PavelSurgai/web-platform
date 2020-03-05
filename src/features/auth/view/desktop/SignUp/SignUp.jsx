import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import RegistrationMenu from './RegistrationMenu/RegistrationMenu';
import registrationMenuItems from '../../../data/registrationMenuItems';
import SocialRegistration from './SocialRegistration/SocialRegistration';
import EmailRegistration from './EmailRegistration/EmailRegistration';
import OneClickRegistration from './OneClickRegistration/OneClickRegistration';
import PhoneRegistration from './PhoneRegistration/PhoneRegistration';
import './SignUp.scss';

class SignUp extends React.Component {
  state = { activeType: registrationMenuItems.PHONE.type }

  static propTypes = {
    locale: PropTypes.object,
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    actionProcessing: PropTypes.bool.isRequired,
    sendToPhoneCode: PropTypes.func.isRequired,
    signUpByEmail: PropTypes.func.isRequired,
    signUpOneClick: PropTypes.func.isRequired,
    signUpPhone: PropTypes.func.isRequired,
    handleAuthModal: PropTypes.func.isRequired,
  }

  render() {
    const b = block('sign-up');
    const { locale, sendToPhoneCode, signUpByEmail, signUpOneClick,
      signUpPhone, currencies, actionProcessing, handleAuthModal } = this.props;
    const { activeType } = this.state;
    let tempRegistrationComponent;
    switch (activeType) {
      case registrationMenuItems.PHONE.type: {
        tempRegistrationComponent = <PhoneRegistration locale={locale} sendToPhoneCode={sendToPhoneCode} signUpPhone={signUpPhone} currencies={currencies} />;
        break;
      }
      case registrationMenuItems.EMAIL.type: {
        tempRegistrationComponent = (
          <EmailRegistration
            locale={locale}
            signUpByEmail={signUpByEmail}
            currencies={currencies}
            actionProcessing={actionProcessing}
            handleAuthModal={handleAuthModal} />
        );
        break;
      }
      case registrationMenuItems.SOCIAL.type: {
        tempRegistrationComponent = <SocialRegistration />;
        break;
      }
      case registrationMenuItems.ONE_CLICK.type: {
        tempRegistrationComponent = <OneClickRegistration locale={locale} signUpOneClick={signUpOneClick} currencies={currencies} />;
        break;
      }
      default: {
        break;
      }
    }

    return (
      <article className={b()}>
        <div className={b('menu')}>
          <RegistrationMenu items={registrationMenuItems} activeType={activeType} locale={locale} callBack={this.changeActiveType} />
        </div>
        {tempRegistrationComponent}
      </article>
    );
  }

  changeActiveType = type => this.setState({ activeType: type })
}

export default SignUp;
