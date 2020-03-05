import React, { useEffect, useMemo, useCallback } from 'react';
import PT from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as basketActions } from 'features/basket';
import { actions as notifyActions } from 'features/notify';
import { actions as lineActions } from 'features/line';
import { actions as outcomeActions } from 'features/slots//outcome/redux';

import { menuItems } from 'shared/utils/menuItems';
import Slider from 'features/slider/mobile';
import { ProfileLinks } from 'features/profile/view/mobile/Profile/ProfileLinks/ProfileLinks';
import SlotsMenu from 'components/SlotsMenu';

import MainLiveLine from './MainLiveLine';
import MainLineLine from './MainLineLine';
import MainSlotsLine from './MainSlotsLine';

import './Main.scss';

const Main = ({ liveSports, topTourneys, locale, addToBasket, bets, oddType, coefType, gameList, flatPagesList,
  loadSession, addNotify, isAuth, outcomeGetGameList, sessionUrl, lang, loadTopEvents, slotsLocale, localeCommon }) => {
  const b = block('main');
  useEffect(() => {
    outcomeGetGameList();
  }, []);
  useEffect(() => {
    loadTopEvents(lang);
  }, lang);
  useEffect(() => {
    if (sessionUrl !== '') location.href = sessionUrl;
  }, [sessionUrl]);
  const selectedRates = bets.map(tempBet => tempBet.ID);
  const onSlotClick = useCallback((e, gameId) => {
    if (isAuth) {
      loadSession(gameId);
    } else {
      e.preventDefault();
      addNotify(slotsLocale.pleaseAuth);
    }
  }, []);
  return (
    <section className={b()}>
      <Slider />
      <MainLiveLine
        sports={liveSports}
        locale={locale}
        addToBasket={addToBasket}
        selectedRates={selectedRates}
        oddType={oddType}
        coefType={coefType}
      />
      <MainLineLine
        sports={topTourneys}
        locale={locale}
        addToBasket={addToBasket}
        selectedRates={selectedRates}
        oddType={oddType}
        coefType={coefType}
      />
      {/* <MainSlotsLine
        slots={[]}
        locale={locale}
        gameList={gameList}
        onSlotClick={onSlotClick}
      /> */}
      {/* <SlotsMenu /> */}
      {/* <ProfileLinks
        flatPagesList={flatPagesList}
        links={menuItems}
        locale={localeCommon}
      /> */}
    </section>
  );
};

Main.propTypes = {
  bets: PT.array.isRequired,
  locale: PT.object.isRequired,
  slotsLocale: PT.object.isRequired,
};

const mapStateToProps = state => ({
  topTourneys: state.line.topTourneys,
  liveSports: state.live.sports,
  locale: state.locale.main,
  localeCommon: state.locale.common,
  slotsLocale: state.locale.inbet,
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  coefType: state.userSettings.coefType,
  bets: state.basket.bets,
  gameList: state.outcome.gameList,
  isAuth: state.auth.isAuth,
  sessionUrl: state.outcome.sessionUrl,
  flatPagesList: state.flatPages.flatPagesList,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addToBasket: basketActions.addToBasket,
    outcomeGetGameList: outcomeActions.getGameList,
    loadSession: outcomeActions.loadSession,
    addNotify: notifyActions.addNotify,
    loadTopEvents: lineActions.loadTopEvents,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Main);