import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import { getSportImgByID } from 'shared/utils/sports';
import arrow from '../../img/arrow-country-menu.svg';
import './LiveSports.scss';

const LiveSports = ({ sports }) => {
  const b = block('live-sports');
  const sportList = sports.map(temp => (
    <Link className={b('link')} to={`/live/sport${temp.ID}`}>
      <img className={b('icon')} src={getSportImgByID(temp.ID)} alt="" />
      <span className={b('text')}>{temp.name}</span>
      <SVGInline svg={arrow} className={b('arrow').toString()} />
    </Link>
  ));
  return (
    <article className={b()}>
      {sportList}
    </article>
  );
}


LiveSports.propTypes = {
  sports: PropTypes.arrayOf(PropTypes.shape({
    isOpen: PropTypes.bool,
    ID: PropTypes.number,
    tourneys: PropTypes.array,
    name: PropTypes.string,
  })).isRequired,
};


const mapStateToProps = state => ({
  sports: state.live.sports,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LiveSports);