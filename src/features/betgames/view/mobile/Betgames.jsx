import React, { Component } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as betgamesActions } from 'features/betgames';

import './Betgames.scss';

class Betgames extends Component {
  static propTypes = {
    isAuth: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,

    getToken: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getToken } = this.props;
    getToken().then(() => this._init());
  }

  componentWillReceiveProps(nextProps) {
    const { isAuth, getToken } = nextProps;
    if (isAuth !== this.props.isAuth) {
      getToken().then(() => {
        this.onRemoveFrame();
        this.onVendorLoaded();
      });
    }
  }

  onVendorLoaded() {
    const { token } = this.props;
    const _bt = _bt || [];
    _bt.push(['server', 'https://integrations01.betgames.tv']);
    _bt.push(['partner', 'seven_bet_com']);
    _bt.push(['token', `${token}`]);
    _bt.push(['language', 'en']);
    _bt.push(['timezone', '0']);

    window.BetGames.frame(_bt);
  }

  onRemoveFrame() {
    const frame = document.getElementsByTagName('iframe')[0];
    frame.remove();
  }

  render() {
    const b = block('betgames');
    return (
      <div className={b()}>
        <div className={b()} id="betgames_div_iframe" />
      </div>
    );
  }

  _init() {
    const s = document.createElement('script');
    s.src = 'https://integrations01.betgames.tv/design/client/js/betgames.js';
    document.head.appendChild(s);
    s.onload = () => this.onVendorLoaded();
  }
}

function mapStateToProps(state) {
  return {
    token: state.betgames.token,
    isAuth: state.auth.isAuth,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    getToken: betgamesActions.getToken,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Betgames);
