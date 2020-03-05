import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { OutcomeGame } from 'features/slots/outcome/desktop';
import { InbetGame } from 'features/slots/inbet/desktop';

import { actions as inbetActions } from 'features/slots/inbet';
import { actions as outcomeActions } from 'features/slots/outcome';

import './SlotsGameLayout.scss';

const SlotsGameLayout = ({ match, outcomeSections, inbetSections,
  outcomeGetGamesList, inbetGetGamesList }) => {
  useEffect(() => {
    outcomeGetGamesList();
    inbetGetGamesList();
  }, []);
  const b = block('slots-game-layout');
  const { gameId, section } = match.params;
  let game = null;
  if (outcomeSections.indexOf(section) !== -1) {
    game = <OutcomeGame gameId={gameId} />;
  } else if (inbetSections.indexOf(section) !== -1) {
    game = <InbetGame gameId={gameId} />;
  }

  return (
    <div className={b()}>
      {game}
    </div>
  );
};

SlotsGameLayout.propTypes = {
  match: PropTypes.object.isRequired,
  outcomeSections: PropTypes.array.isRequired,
  inbetSections: PropTypes.array.isRequired,
  outcomeGetGamesList: PropTypes.func.isRequired,
  inbetGetGamesList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  outcomeSections: state.outcome.sections,
  inbetSections: state.inbet.sections,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    inbetGetGamesList: inbetActions.getGamesList,
    outcomeGetGamesList: outcomeActions.getGameList,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsGameLayout);
