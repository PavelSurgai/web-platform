import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';

import FlatPage from 'features/flatPages/desktop';

export const FlatPagesLayout = ({ match }) => {
  const { flatPageName } = match.params;
  const b = block('flat-page-layout');
  return (
    <div className={b()}>
      <FlatPage name={flatPageName} />
    </div>
  );
};

FlatPagesLayout.propTypes = {
  match: PropTypes.object.isRequired,
};
