import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './CenterMenu.scss';

const CenterMenu = ({ locale }) => {
  const b = block('center-menu');
  return <nav className={b()}>
    <NavLink
      className={b('link').toString()}
      activeClassName={b('link', { active: true }).toString()}
      to="/line/top-events"
    >
      {locale.topLeagues}
    </NavLink>
    <NavLink
      className={b('link').toString()}
      activeClassName={b('link', { active: true }).toString()}
      to="/line/upcoming-events"
    >
      {locale.upcomingEvents}
    </NavLink>
  </nav>;
};

CenterMenu.propTypes = {
  locale: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    locale: state.locale.common,
  };
}

export default connect(mapStateToProps)(CenterMenu);