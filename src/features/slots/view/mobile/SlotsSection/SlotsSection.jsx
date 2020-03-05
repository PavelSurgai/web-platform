import React, { useEffect } from 'react';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import {
  getSlotImage as getOutcomeSlotImage,
  sectionNames as outcomeSectionNames,
} from 'shared/utils/slots/outcome';

import Spinner from 'components/Spinner/mobile';
import BackBlock from 'components/BackBlock/mobile';

import { OutcomeGameIconFull } from 'features/slots/outcome/mobile';

import { gameList, sectionList } from 'features/slots/outcome/data';

import { actions as notifyActions } from 'features/notify';
import { actions as outcomeActions } from 'features/slots/outcome/redux';


const SlotsSection = ({ outcomeGameList, outcomeGetGameList, outcomeSessionUrl,
  outcomeActionProcessing, outcomeLoadSession, isAuth, locale, addNotify, section }) => {
  const b = block('slots-short-content');

  useEffect(() => {
    if (!outcomeGameList.length) {
      outcomeGetGameList();
    }
  }, []);

  useEffect(() => {
    if (outcomeSessionUrl) {
      location.href = outcomeSessionUrl;
    }
  }, [outcomeSessionUrl]);

  const games = outcomeGameList.reduce((acc, item) => {
    if (section === item.sectionId) {
      const image = getOutcomeSlotImage(item.id, item.sectionId);
      const game = (
        <OutcomeGameIconFull
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
        />);
      return [...acc, game];
    }
    return acc;
  }, []);
  return (
    <div className={b()}>
      <Spinner isLoading={outcomeActionProcessing} />
      <div className={b('wrapper')}>
        <BackBlock>
          {outcomeSectionNames[section]}
        </BackBlock>
        {games}
      </div>
    </div>
  );
};

SlotsSection.propTypes = {
  locale: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
  outcomeActionProcessing: PropTypes.bool.isRequired,
  outcomeGameList: PropTypes.array.isRequired,
  outcomeSessionUrl: PropTypes.string,
  section: PropTypes.string.isRequired,

  outcomeGetGameList: PropTypes.func.isRequired,
  outcomeLoadSession: PropTypes.func.isRequired,
  addNotify: PropTypes.func.isRequired,

};

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
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SlotsSection);