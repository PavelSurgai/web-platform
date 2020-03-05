import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from 'components/Spinner';
import { actions } from 'features/liveGames/redux';
import './LiveGame.scss';

const LiveGame = ({ token, operatorId, actionProcessing, lang, getEzugiToken }) => {
  useEffect(() => {
    getEzugiToken();
  }, []);
  const game = location.pathname.split('/')[location.pathname.split('/').length - 1];
  const b = block('live-games');
  const formatedLang = lang === 'pt-pt' ? 'es' : 'en';
  const isLoading = token.lenght > 0;
  const url = `https://play.livetables.io/auth/?token=${token}&operatorId=${operatorId}&language=${formatedLang}&selectGame=${game}`;
  return (
    <div className={b()}>
      {(isLoading || !game.length || token.length === 0 || operatorId.length === 0) ? <Spinner isLoading={actionProcessing} /> :
      <iframe title="ezugi" className={b('iframe')} width="100%" height="600" src={url} allowFullScreen="allowFullScreen" />}
    </div>
  );
};

LiveGame.propTypes = {
  actionProcessing: PropTypes.bool.isRequired,
  game: PropTypes.string,
  token: PropTypes.string.isRequired,
  operatorId: PropTypes.number,
  lang: PropTypes.string.isRequired,

  getEzugiToken: PropTypes.func.isRequired,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(LiveGame);
