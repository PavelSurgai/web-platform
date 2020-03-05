import React from 'react';
import block from 'bem-cn';

import { Live } from 'features/live/mobile';

import './LiveLayout.scss';

export default () => {
  const b = block('live-layout');
  return (
    <div className={b()}>
      <Live />
    </div>
  );
};