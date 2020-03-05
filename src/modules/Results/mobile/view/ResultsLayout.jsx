import React from 'react';
import block from 'bem-cn';

import Results from 'features/results/mobile';

export const ResultsLayout = () => {
  const b = block('results-layout');
  return (
    <div className={b()}>
      <Results />
    </div>
  );
};