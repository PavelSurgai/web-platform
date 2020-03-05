import React from 'react';
import block from 'bem-cn';

import RestoreByEmail from 'features/auth/view/desktop/RestoreByEmail';

export const RestoreByEmailLayout = () => {
  const b = block('restore-email');
  return (
    <div className={b()}>
      <RestoreByEmail
      />
    </div>
  );
};
