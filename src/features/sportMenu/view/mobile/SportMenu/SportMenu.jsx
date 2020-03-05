import React, { useEffect, useMemo } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as sportMenuActions } from 'features/sportMenu';

import { SportMenuItem } from './SportMenuItem/SportMenuItem';
import './SportMenu.scss';

const SportMenu = ({ getSports, sports, lang }) => {
  const b = block('sport-menu');

  useEffect(() => {
    getSports();
  }, [lang, getSports]);

  const sportItems = useMemo(() => sports.map(sport => (
    <SportMenuItem
      key={sport.ID}
      text={sport.Name}
      id={sport.ID}
    />
  )), [sports]);

  return <nav className={b()}>
    <ul className={b('list').mix('scrollable')}>
      {sportItems}
    </ul>
  </nav>;
};

SportMenu.propTypes = {
  sports: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,

  getSports: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    sports: state.sportMenu.sports,
    lang: state.userSettings.lang,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getSports: sportMenuActions.getSports,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SportMenu));
