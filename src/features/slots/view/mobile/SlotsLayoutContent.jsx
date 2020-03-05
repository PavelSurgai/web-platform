import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import SVGInline from 'react-svg-inline';

import {
  getSlotImage as getOutcomeSlotImage,
  sectionNames as outcomeSectionNames,
} from 'shared/utils/slots/outcome';

import { actions as notifyActions } from 'features/notify';

import bigArrow from '../../outcome/view/img/big-arrow.svg';
// import LiveGamesAll from 'features/liveGames/view/mobile/LiveGamesAll';
import { OutcomeGameIcon } from 'features/slots/outcome/mobile';

import { gameList, sectionList } from '../../outcome/data';

import { actions as outcomeActions } from '../../outcome/redux';
import { actions as inbetActions } from '../../inbet/redux';

import SlotsMenu from './SlotsMenu';

import './SlotsLayoutContent.scss';
class SlotsLayoutContent extends React.Component {
  state = {
    isLiveGames: false,
  }

  static propTypes = {
    locale: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
    outcomeActionProcessing: PropTypes.bool.isRequired,
    outcomeGameList: PropTypes.array.isRequired,
    outcomeGetGameList: PropTypes.func.isRequired,
    outcomeSessionUrl: PropTypes.string,
    outcomeLoadSession: PropTypes.func.isRequired,

    inbetLoadGamesList: PropTypes.func.isRequired,
    addNotify: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.outcomeGetGameList();
    this.props.inbetLoadGamesList();
  }

  componentWillReceiveProps(nextProps) {
    const { outcomeSessionUrl, isAuth, outcomeGetGameList } = nextProps;
    if (this.props.outcomeSessionUrl !== outcomeSessionUrl && outcomeSessionUrl) {
      location.href = outcomeSessionUrl;
    }
    if (nextProps.isAuth && nextProps.isAuth !== isAuth) {
      outcomeGetGameList();
    }
  }


  render() {
    const b = block('slots-layout-content');
    const { outcomeGameList, outcomeActionProcessing, outcomeLoadSession, isAuth, locale,
      addNotify } = this.props;
    const { isLiveGames } = this.state;
    const sectionNames = { ...outcomeSectionNames };
    const sections = {};
    outcomeGameList.forEach(item => {
      const image = getOutcomeSlotImage(item.id, item.sectionId);
      const game = (
        <OutcomeGameIcon
          key={item.id}
          section={item.sectionId}
          img={image}
          description={item.description}
          gameId={item.id}
          name={item.name}
          loadSession={outcomeLoadSession}
          isAuth={isAuth}
          locale={locale}
          addNotify={addNotify}
        />
      );
      if (sections[item.sectionId]) {
        sections[item.sectionId].push(game);
      } else {
        sections[item.sectionId] = [];
        sections[item.sectionId].push(game);
      }
    });
    const games = Object.entries(sections).map((item, index) => {
      const name = sectionNames[item[0]];
      const icons = item[1].slice(0, 10);
      return (
        <div key={index} className={b('items-wrapper')}>
          <Link to={`/slots/${item[0]}`} className={b('items-header')}>
            <div className={b('items-header-title')}>
              {name}
            </div>
            <SVGInline svg={bigArrow} className={b('header-arrow')} />
          </Link>
          <div className={b('items')}>{icons}</div>
        </div>
      );
    });
    return !outcomeActionProcessing && (
      <div className={b()}>
        {/* <SlotsMenu onMenuClick={this.setOpenedLiveGames} isOpenLiveGames={isLiveGames} locale={locale} /> */}
        {isLiveGames ? '' :
        <React.Fragment>
          {games}
        </React.Fragment>}
      </div>
    );
  }

  setOpenedLiveGames = bool => {
    if (bool !== this.state.isLiveGames) {
      this.setState({ isLiveGames: bool });
    }
  };
}

const mapStateToProps = state => {
  const { isAuth } = state.auth;
  const outcomeGameList = isAuth ? state.outcome.gameList : gameList;
  const outcomeSections = isAuth ? state.outcome.sections : sectionList;
  return {
    isAuth,
    locale: state.locale.inbet,
    outcomeActionProcessing: state.outcome.actionProcessing,
    outcomeGameList,
    outcomeSections,
    outcomeSessionUrl: state.outcome.sessionUrl,

    inbetActionProcessing: state.inbet.actionProcessing,
    inbetGameList: state.inbet.gameList,
    inbetSections: state.inbet.sections,
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    outcomeGetGameList: outcomeActions.getGameList,
    outcomeLoadSession: outcomeActions.loadSession,
    addNotify: notifyActions.addNotify,

    inbetLoadGamesList: inbetActions.getGamesList,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsLayoutContent);
