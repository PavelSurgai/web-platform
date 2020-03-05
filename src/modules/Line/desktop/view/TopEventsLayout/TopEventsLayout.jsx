import React from 'react';
import block from 'bem-cn';

import { TopEvents } from 'features/line/desktop';

export const TopEventsLayout = () => {
  const b = block('top-events-layout');
  return (
    <div className={b()}>
      <TopEvents />
    </div>
  );
};