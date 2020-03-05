import React from 'react';
import block from 'bem-cn';

import RestoreByEmail from 'features/auth/view/mobile/RestoreByEmail';

export const RestoreByEmailLayout = () => {
  const b = block('restore-email');
  return (
    <div className={b()}>
      <RestoreByEmail
      />
    </div>
  );
};
