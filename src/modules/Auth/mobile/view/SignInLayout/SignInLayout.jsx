import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import SignIn from 'features/auth/view/mobile/SignIn';

const SignInLayout = ({ history }) => {
  const b = block('auth-layout');
  return (
    <div className={b()}>
      <SignIn history={history} />
    </div>
  );
};

SignInLayout.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignInLayout;
