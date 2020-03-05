import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SlotsSection from 'features/slots/view/mobile/SlotsSection';

import { actions as inbetActions } from 'features/slots/inbet';

import './SlotsSectionLayout.scss';

const SlotsSectionLayout = ({ match }) => {
  const b = block('slots-section-layout');
  const { section } = match.params;
  return (
    <div className={b()}>
      <SlotsSection section={section} />
    </div>
  );
};

SlotsSectionLayout.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  inbetSections: state.inbet.sections,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    inbetGetGamesList: inbetActions.getGamesList,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsSectionLayout);
