import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { domain } from 'shared/settings';

import { actions as inbetGameActions } from '../../../redux';

import './InbetGame.scss';

class InbetGame extends React.Component {
  state = {
    isActive: false,
  };

  static propTypes = {
    session: PropTypes.string,
    user: PropTypes.object.isRequired,
    inbetKf: PropTypes.object.isRequired,
    gameList: PropTypes.array.isRequired,
    loadSession: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.loadSession();
    this.addEventListener();
  }

  componentWillReceiveProps(nextProps) {
    const { session, gameList, inbetKf, user } = nextProps;
    if (session && !this.state.isActive && gameList.length !== 0 &&
      Object.keys(inbetKf).length !== 0 && user.currency) {
      this.getFrame(nextProps);
    }
  }

  render() {
    const b = block('inbet');
    return (
      <div className={b('game')}>
        <div id="game-content" />
      </div>
    );
  }

  getFrame = nextProps => {
    const { gameId, lang, session, inbetKf, user } = nextProps;
    this.setState({ isActive: true });
    window.init_loader({
      path: `${domain}/inbet/media/`,
      game: gameId,
      billing: 'ahC5ahju',
      token: session,
      kf: inbetKf[user.currency].toString(),
      currency: user.currency,
      button: 'classic',
      language: lang,
      home_page: '/',
    });
  };

  addEventListener = () => {
    window.addEventListener('orientationchange', () => {
      this.render();
      const el = document.getElementById('game-content');
      if (el) { setTimeout(() => { el.scrollIntoView(true); }, 500); }
    });
  }
}

const mapStateToProps = state => ({
  session: state.inbet.session,
  user: state.auth.user,
  inbetKf: state.userSettings.inbetKf,
  lang: state.userSettings.lang,
  gameList: state.inbet.gameList,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    loadSession: inbetGameActions.loadSession,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(InbetGame);
