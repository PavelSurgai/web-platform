import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import './UpcomingMenu.scss';

export const UpcomingMenu = ({ activeTime, timeList, callBack, locale }) => {
  const b = block('upcoming-menu');
  const itemList = timeList.map(tempTime => <div
    key={tempTime.ID}
    onClick={() => callBack(tempTime.ID)}
    className={b('item', { active: tempTime.ID === activeTime.ID })}>
    {locale[tempTime.textID]}
  </div>);
  
  return (
    <section className={b()}>
      {itemList}
    </section>
  );
};

UpcomingMenu.propTypes = {
  activeTime: PropTypes.shape({
    ID: PropTypes.number.isRequired,
    textID: PropTypes.string.isRequired,
  }),
  timeList: PropTypes.array.isRequired,
  callBack: PropTypes.func.isRequired,
  locale: PropTypes.object,
};