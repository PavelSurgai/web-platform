import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './TimeFilter.scss';

const TimeFilter = ({ locale, changeFilterValue, filterValue }) => {
  const b = block('time-filter');
  const values = useMemo(() => [0, 60, 180, 360, 720, 1440], [locale]);
  const items = useMemo(() => values.map(temp => (
    <div
      className={b('item', { active: filterValue === temp })}
      key={temp}
      onClick={() => changeFilterValue(temp)}
    >
      {locale[temp]}
    </div>
  )), [filterValue, values, locale]);
  return (
    <div className={b()}>
      {items}
    </div>
  );
};

TimeFilter.propTypes = {
  locale: PropTypes.object.isRequired,
  filterValue: PropTypes.number.isRequired,
  changeFilterValue: PropTypes.func.isRequired,
};

export default React.memo(TimeFilter);
