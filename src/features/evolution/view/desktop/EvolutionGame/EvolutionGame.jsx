import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as evolutionGameActions } from 'features/evolution/redux';

import Spinner from 'components/Spinner';
import './EvolutionGame.scss';

class EvolutionGame extends React.Component {
  static propTypes = {
    gameURL: PropTypes.string.isRequired,
    actionProcessing: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    gameList: PropTypes.array.isRequired,
    runGame: PropTypes.func.isRequired,
    getGameList: PropTypes.func.isRequired,
  }

  async componentDidMount() {
    const { gameList, getGameList } = this.props;
    if (!gameList.length) await getGameList();
    this.evolutionGameInit();
  }

  componentWillReceiveProps(nextProps) {
    const { gameList } = this.props;
    if (gameList.length !== nextProps.gameList.length) this.evolutionGameInit();
  }

  render() {
    const b = block('evolution');
    const { gameURL, actionProcessing } = this.props;
    return (
      <div className={b('game')}>
        <Spinner isLoading={actionProcessing} />
        {gameURL !== '' &&
          <iframe src={gameURL} className={b('iframe')} align="left" title="Evolution Game" scrolling="no" />}
      </div>
    );
  }

  evolutionGameInit = () => {
    const { runGame, gameList, match } = this.props;
    const { gameId } = match.params;
    const currentGame = gameList.length && gameList.filter(game => game.ID === gameId)[0];
    if (currentGame.PageCode) runGame(currentGame.PageCode);
  };
}

const mapStateToProps = state => ({
  gameURL: state.evolution.gameURL,
  gameList: state.evolution.gameList,
  actionProcessing: state.evolution.actionProcessing,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    runGame: evolutionGameActions.runGame,
    getGameList: evolutionGameActions.getGameList,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EvolutionGame);
