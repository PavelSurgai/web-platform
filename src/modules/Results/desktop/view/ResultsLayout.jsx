import React from 'react';
import block from 'bem-cn';

import Results from 'features/results/desktop';

export const ResultsLayout = () => {
  const b = block('results-layout');
  return (
    <div className={b()}>
      <Results />
    </div>
  );
};