import React from 'react';
import block from 'bem-cn';

import Bonuses from 'features/bonuses/mobile';

export const BonusesLayout = () => {
  const b = block('bonuses-layout');
  return (
    <div className={b()}>
      <Bonuses />
    </div>
  );
};
