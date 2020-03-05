import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import Button from 'components/Button/mobile';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './ViewAllSport.scss';

const ViewAllSport = ({ locale }) => {
  const b = block('view-all');
  return (
    <ul className={b('container')}>
      <li className={b('')} />
    </ul>

  );
};

ViewAllSport.propTypes = {
  locale: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.common,
  };
}

export default connect(mapStateToProps)(ViewAllSport);