import React from 'react';
import block from 'bem-cn';

import SignUp from 'features/auth/view/mobile/SignUp';

const SignUpLayout = () => {
  const b = block('auth-layout');
  return (
    <div className={b()}>
      <SignUp />
    </div>
  );
};


export default SignUpLayout;