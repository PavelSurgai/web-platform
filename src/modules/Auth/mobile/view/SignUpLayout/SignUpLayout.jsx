import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import SignUp from 'features/auth/view/mobile/SignUp';

import './SignUpLayout.scss';

const SignUpLayout = ({ history }) => {
  const b = block('auth-layout');
  return (
    <div className={b()}>
      <SignUp history={history} />
    </div>
  );
};

SignUpLayout.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignUpLayout;
