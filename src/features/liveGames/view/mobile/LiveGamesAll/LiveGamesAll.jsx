import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions } from 'features/liveGames/redux';

import Spinner from 'components/Spinner';
import { EzugiGameList } from 'features/liveGames/data/EzugiGameList';
import './LiveGamesAll.scss';

class LiveGamesAll extends Component {
  state = {
    activeGame: '',
  }

  static propTypes = {
    actionProcessing: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    operatorId: PropTypes.number.isRequired,
    lang: PropTypes.string.isRequired,

    getEzugiToken: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    const { token } = this.props;
    const formatedLang = nextProps.lang === 'fr-fr' ? 'fr' : 'en';
    const { activeGame } = this.state;
    if (token !== nextProps.token && nextProps.token) {
      const url = `https://play.livetables.io/auth/?token=${nextProps.token}&operatorId=${nextProps.operatorId}&language=${formatedLang}&selectGame=${activeGame}&homeUrl=https://157fashion.com/live`;
      location.href = url;
    }
  }

  onBannerClick(game) {
    const { getEzugiToken } = this.props;
    getEzugiToken();
    this.setState({ activeGame: game });
  }

  render() {
    const b = block('live-games-all');
    const { actionProcessing } = this.props;
    const gameList = EzugiGameList.map(game =>
      <div className={b('game')} onClick={() => this.onBannerClick(game.name)} key={game.name}>
        <img className={b('game-img')} src={game.img} alt={game.name} />
      </div>);
    return (
      <div className={b()}>
        {actionProcessing ? <Spinner isLoading={actionProcessing} /> : gameList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.liveGames.token,
    operatorId: state.liveGames.operatorId,
    actionProcessing: state.liveGames.actionProcessing,
    lang: state.userSettings.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(LiveGamesAll);
