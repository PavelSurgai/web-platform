import React from 'react';
import block from 'bem-cn';

import { FavoritesEvents } from 'features/line/desktop';

export const FavoritesEventsLayout = () => {
  const b = block('favorites-layout');
  return (
    <div className={b()}>
      <FavoritesEvents />
    </div>
  );
};
