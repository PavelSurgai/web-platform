import React, { useState } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import SVGInline from 'react-svg-inline';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as lineActions } from 'features/line/redux';
import lineMenuItems from '../../../data/lineMenuItems';
import collapseSVG from '../../img/collapse.svg';
import './LineMenu.scss';

const LineMenu = ({ locale, location, favoritesCount, changeOpenedAllLineTourneys }) => {
  const [isOpen, setOpenedLineTourneys] = useState(true);
  const isNeedCollapseButton = location.pathname.indexOf('line/sport') !== -1;
  const b = block('line-menu');
  const itemsList = lineMenuItems.map(temp => (
    <Link key={temp.route} className={b('item', { active: location.pathname === temp.route(location.pathname) })} to={temp.route(location.pathname)}>
      <img src={temp.icon} className={b('item-icon').toString()} alt="" />
      {`${locale[temp.textID]}${temp.textID === 'favorites' ? ` (${favoritesCount})` : ''}`}
    </Link>
  ));
  return (
    <nav className={b()}>
      <div className={b('left-block')}>
        {itemsList}
      </div>
      <div className={b('right-block')}>
        {isNeedCollapseButton && <SVGInline
          className={b('collapse', { closed: isOpen }).toString()}
          svg={collapseSVG}
          onClick={() => { setOpenedLineTourneys(!isOpen); changeOpenedAllLineTourneys(isOpen); }} />
        }
      </div>
    </nav>
  );
};

LineMenu.propTypes = {
  location: PropTypes.object.isRequired,
  locale: PropTypes.object,
  favoritesCount: PropTypes.number.isRequired,

  changeOpenedAllLineTourneys: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  locale: state.locale.line,
  favoritesCount: state.line.favoritesList.length,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    changeOpenedAllLineTourneys: lineActions.changeOpenedAllLineTourneys,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(React.memo(LineMenu)));