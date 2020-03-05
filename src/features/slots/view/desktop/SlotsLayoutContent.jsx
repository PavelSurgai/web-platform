import React from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';

import {
  getSlotImage as getOutcomeSlotImage,
  sectionNames as outcomeSectionNames,
} from 'shared/utils/slots/outcome';

import {
  getSlotImage as getInbetSlotImage,
  sectionNames as inbetSectionNames,
} from 'shared/utils/slots/inbet';

import { gameList, sectionList } from '../../outcome/data';

import { actions as notifyActions } from 'features/notify';
import { actions as outcomeActions } from '../../outcome/redux';
import { actions as inbetActions } from '../../inbet/redux';

import { OutcomeGameIcon } from '../../outcome/desktop';
import { InbetGameIcon } from '../../inbet/desktop';

import SlotsLayoutContentMenu from './SlotsLayoutContentMenu';
import SlotsLayoutContentGames from './SlotsLayoutContentGames';

import './SlotsLayoutContent.scss';

class SlotsLayoutContent extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    locale: PropTypes.object.isRequired,
    isAuth: PropTypes.bool.isRequired,
    outcomeActionProcessing: PropTypes.bool.isRequired,
    outcomeGameList: PropTypes.array.isRequired,
    outcomeSections: PropTypes.array.isRequired,
    outcomeGetGameList: PropTypes.func.isRequired,

    inbetActionProcessing: PropTypes.bool.isRequired,
    inbetGameList: PropTypes.array.isRequired,
    inbetSections: PropTypes.array.isRequired,
    inbetLoadGamesList: PropTypes.func.isRequired,

    addNotify: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { isAuth, outcomeGetGameList, inbetLoadGamesList } = this.props;
    if (isAuth) {
      outcomeGetGameList();
      inbetLoadGamesList();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuth, outcomeGetGameList } = this.props;
    if (nextProps.isAuth && nextProps.isAuth !== isAuth) {
      outcomeGetGameList();
    }
  }

  render() {
    const b = block('slots-layout-content');
    const {
      outcomeGameList, outcomeSections, outcomeActionProcessing, isAuth, locale,
      inbetGameList, inbetSections, inbetActionProcessing, match, addNotify,
    } = this.props;
    const currentSection = match.params.section || 'all';

    const menuItems = [...outcomeSections];
    const sectionNames = { ...outcomeSectionNames, ...inbetSectionNames };

    let slotsGames = [];
    let slotsActionProcessing = true;
    if (outcomeSectionNames.hasOwnProperty(currentSection)) {
      slotsActionProcessing = outcomeActionProcessing;
      slotsGames = outcomeGameList && outcomeGameList.map(item => {
        const image = getOutcomeSlotImage(item.id, item.sectionId);
        return currentSection === item.sectionId || currentSection === 'all' ?
          (
            <OutcomeGameIcon
              key={item.id}
              section={item.sectionId}
              img={image}
              description={item.description}
              gameId={item.id}
              isAuth={isAuth}
              addNotify={addNotify}
              locale={locale}
            />
          ) : '';
      });
    }

    if (inbetSectionNames.hasOwnProperty(currentSection)) {
      slotsActionProcessing = inbetActionProcessing;
      slotsGames = inbetGameList && inbetGameList.map(game => {
        const image = getInbetSlotImage(game.preview);
        return currentSection === game.type || currentSection === 'all' ?
          (
            <InbetGameIcon
              key={game.html5.app[0]}
              section={game.type}
              img={image}
              gameId={game.source}
            />
          ) : '';
      });
    }

    return (!slotsActionProcessing || !isAuth) && (
      <div className={b()}>
        <SlotsLayoutContentMenu
          menuItems={menuItems}
          currentSection={currentSection}
          sectionNames={sectionNames}
          subMenuItems={inbetSections} />
        <SlotsLayoutContentGames
          slotsGames={slotsGames} />
      </div>
    );
  }
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

    inbetActionProcessing: state.inbet.actionProcessing,
    inbetGameList: state.inbet.gameList,
    inbetSections: state.inbet.sections,
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    outcomeGetGameList: outcomeActions.getGameList,
    inbetLoadGamesList: inbetActions.getGamesList,
    addNotify: notifyActions.addNotify,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsLayoutContent);
