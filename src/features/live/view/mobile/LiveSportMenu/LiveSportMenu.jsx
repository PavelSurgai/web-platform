import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import LiveSportMenuItem from './LiveSportMenuItem';
import './LiveSportMenu.scss';

const LiveSportMenu = ({ sportList, activeID, callBack }) => {
  const b = block('live-sport-menu');
  const itemsList = sportList.map(temp => <LiveSportMenuItem
    key={temp.ID}
    text={temp.name}
    ID={temp.ID}
    isActive={temp.ID === activeID}
    callBack={callBack} />);
  return (
    <section className={b('container').mix('scrollable')}>
      {itemsList}
    </section>
  );
};

LiveSportMenu.propTypes = {
  sportList: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  callBack: PropTypes.func.isRequired,
  activeID: PropTypes.number.isRequired,
};

export default LiveSportMenu;