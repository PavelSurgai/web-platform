import React from 'react';
import block from 'bem-cn';

import SignIn from 'features/auth/view/mobile/SignIn';

const SignInLayout = () => {
  const b = block('auth-layout');
  return (
    <div className={b()}>
      <SignIn />
    </div>
  );
};


export default SignInLayout;