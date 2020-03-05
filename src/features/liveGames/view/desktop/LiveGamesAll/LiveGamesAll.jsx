import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from 'components/Spinner';
import { EzugiGameList } from 'features/liveGames/data/EzugiGameList';
import './LiveGamesAll.scss';

class LiveGamesAll extends Component {
  static propTypes = {
    actionProcessing: PropTypes.bool.isRequired,
  }

  render() {
    const b = block('live-games-all');
    const { actionProcessing } = this.props;
    const gameList = EzugiGameList.map((game, index) => {
      return (<Link key={index} to={`/live-casino/${game.name}`} className={b('game')}>
        <img className={b('game-img')} src={game.img} alt={game.name} />
      </Link>);
    });
    return (
      <div className={b()}>
        {actionProcessing ? <Spinner isLoading={actionProcessing} /> : gameList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    actionProcessing: state.liveGames.actionProcessing,
  };
}


export default connect(mapStateToProps)(LiveGamesAll);
