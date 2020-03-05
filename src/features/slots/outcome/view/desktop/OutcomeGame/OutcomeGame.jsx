import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as outcomeActions } from '../../../redux';
import './OutcomeGame.scss';

class OutcomeGame extends React.Component {
  static propTypes = {
    gameId: PropTypes.string.isRequired,
    sessionUrl: PropTypes.string.isRequired,

    loadSession: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { loadSession, gameId } = this.props;
    loadSession(gameId);
  }

  render() {
    const b = block('outcome-game');
    const { sessionUrl } = this.props;
    return (
      <div className={b()}>
        <iframe title="slots-frame" className={b('iframe')} width="1920" height="1080" src={sessionUrl} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sessionUrl: state.outcome.sessionUrl,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    loadSession: outcomeActions.loadSession,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OutcomeGame);
