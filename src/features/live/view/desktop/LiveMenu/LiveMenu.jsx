import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import liveMenuItems from '../../../data/liveMenuItems';
import './LiveMenu.scss';

const LiveMenu = ({ locale, location }) => {
  const b = block('live-menu');
  const itemsList = liveMenuItems.map(temp => (
    <Link key={temp.route} className={b('item', { active: location.pathname === temp.route })} to={temp.route}>
      {locale[temp.textID]}
    </Link>
  ));
  return (
    <nav className={b()}>
      {itemsList}
    </nav>
  );
};

LiveMenu.propTypes = {
  location: PropTypes.object.isRequired,
  locale: PropTypes.object,
};

const mapStateToProps = state => ({ locale: state.locale.live });

export default connect(mapStateToProps)(withRouter(React.memo(LiveMenu)));