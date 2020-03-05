import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';

import Input from 'components/Input/desktop';
import Button from 'components/Button/desktop';
import socialItems from '../../../data/social';
import './SignIn.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  static propTypes = {
    startRecovery: PropTypes.func.isRequired,
    signInUniversal: PropTypes.func.isRequired,
    locale: PropTypes.object,
  }

  onChangeListener = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  onChangePhoneListener = e => this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  
  onSubmit = e => {
    e.preventDefault();
    const { login, password } = this.state;
    const { signInUniversal } = this.props;
    signInUniversal(login, password);
  }

  render() {
    const b = block('sign-in');
    const { login, password } = this.state;
    const { locale, startRecovery } = this.props;

    const validation = login.length && password.length;
    return (
      <form className={b()} onSubmit={this.onSubmit}>
        <label>
          <div className={b('label')}>{locale.email}</div>
          <div className={b('input')}>
            <Input
              value={login}
              name="login"
              placeholder={locale.email}
              callBack={this.onChangePhoneListener}
            />
          </div>
        </label>
        <div className={b('label')}>{locale.inputPassword}</div>
        <div className={b('input', { last: true })}>
          <Input
            value={password}
            name="password"
            placeholder={locale.password}
            callBack={this.onChangeListener}
            type="password"
          />
        </div>
        <div className={b('recovery')} onClick={() => startRecovery()}>{locale.forgotPassword}</div>
        <div className={b('button')}>
          <Button
            type="submit"
            text={locale.login}
            size="low"
            disabled={!validation}
          />
        </div>
      </form>
    );
  }

  _isPhone = str => str.indexOf('@') === -1 && str.indexOf('.') === -1;
}

export default SignIn;