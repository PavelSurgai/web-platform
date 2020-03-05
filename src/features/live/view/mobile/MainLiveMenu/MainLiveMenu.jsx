import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';

import { actions as liveActions } from '../../../redux';

import './MainLiveMenu.scss';

const MainLiveMenu = ({ location: { pathname }, locale }) => {
  const b = block('main-live-menu');

  const [prevPathname, changePrevPathname] = useState(pathname);
  const [animate, changeAnimate] = useState(false);

  useEffect(() => {
    if (prevPathname) {
      const changedPath = pathname === '/live' ? 'live' : 'sports';
      const changedPrevPath = prevPathname === '/live' ? 'live' : 'sports';
      changeAnimate(`${changedPrevPath}-${changedPath}`);
    }
    changePrevPathname(pathname);
  }, [pathname]);

  if (!pathname.includes('/live/sports') && pathname !== '/live') return null;
  return (
    <div className={b()}>
      <div className={b('switcher', { animate })}>
        <Link className={b('element', { active: pathname === '/live' })} to="/live">
          {locale.events}
        </Link>
        <Link className={b('element', { active: pathname.includes('/live/sports') })} to="/live/sports">
          {locale.typesSports}
        </Link>
      </div>
    </div>
  );
};

MainLiveMenu.propTypes = {
  location: PropTypes.object.isRequired,
  locale: PropTypes.object,
};

const mapStateToProps = state => ({
  locale: state.locale.live,
  sports: state.live.sports,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(liveActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainLiveMenu));