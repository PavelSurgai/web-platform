import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';

import CyberMenuItem from './CyberMenuItem';
import './CyberMenu.scss';

const CyberMenu = ({ sportList, activeID, callBack }) => {
  const b = block('cyber-menu');
  const itemsList = sportList.map(temp => <CyberMenuItem
    key={temp.ID}
    text={temp.name}
    ID={temp.ID}
    isActive={temp.ID === activeID}
    callBack={callBack} />);
  return (
    <section className={b()}>
      {itemsList}
    </section>
  );
};

CyberMenu.propTypes = {
  sportList: PropTypes.arrayOf(PropTypes.shape({
    ID: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  callBack: PropTypes.func.isRequired,
  activeID: PropTypes.number.isRequired,
};

export default CyberMenu;