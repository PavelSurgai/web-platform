import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import asyncPoll from 'react-async-poll';

import { actions as lineActions } from '../../../redux';

const LivePooling = ({ lang, loadLive, updateLive }) => {
  useEffect(() => {
    loadLive();
  }, []);

  useEffect(() => {
    updateLive();
  }, [lang]);

  return null;
};

const mapStateToProps = state => ({
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  locale: state.locale.live,
  sports: state.live.sports,
  bets: state.basket.bets,
});

const mapDispatchToProps = dispatch => bindActionCreators(lineActions, dispatch);

function onCHPOCKInterval(props) {
  props.updateLive();
}

export default connect(mapStateToProps, mapDispatchToProps)(asyncPoll(3 * 1000, onCHPOCKInterval)(LivePooling));
