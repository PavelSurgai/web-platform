import React from 'react';
import block from 'bem-cn';

import { MultiLive } from 'features/live/mobile';

export default () => {
  const b = block('live-layout');
  return (
    <div className={b()}>
      <MultiLive />
    </div>
  );
};