import React, { useState, useEffect } from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';

import Spinner from 'components/Spinner';
import BackBlock from 'components/BackBlock/mobile';
import BottomPopUp from 'components/BottomPopUp';
import Paginator from 'components/Paginator/mobile';
import { actions as profileActions } from 'features/profile';
import BackBlockContent from './BackBlockContent';
import BetsFilter from './BetsFilter';
import SingleItem from './SingleItem';
import MultiItem from './MultiItem';
import { SellBet } from './SellBet';
import { actions as betHistoryActions } from '../../redux';

import './BetHistory.scss';

const BetHistory = ({ locale, bets, actionProcessing, getBetContent, betContents, count, getBetHistory,
  getUserCashoutBets, cashoutBets, currency, sellBet, getUserInfo, isActiveUseName, firstName, lastName }) => {
  const [showWinBets, setShowWinBets] = useState(true);
  const [showLossBets, setShowLoseBets] = useState(true);
  const [sellBetId, onSetSellBetId] = useState(null);
  const [isSellBetModalOpen, onSetSellBetModalOpen] = useState(false);
  const [showWorkBets, setShowWorkBets] = useState(true);
  const [page, setPage] = useState(0);
  const [beginDate, setBeginDate] = useState(new Date(dayjs().add(-7, 'day')));
  const [endDate, setEndDate] = useState(new Date(dayjs().add(1, 'day')));
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const changeOpenFilter = () => setIsFiltersOpen(!isFiltersOpen);
  const onPageClick = newPage => {
    setPage(newPage);
    document.querySelector('.app__scroll-block').scrollTo(0, 0);
  };

  const methodsToChangeValues = {
    showWinBets: () => setShowWinBets(!showWinBets),
    showLoseBets: () => setShowLoseBets(!showLossBets),
    showWorkBets: () => setShowWorkBets(!showWorkBets),
    beginDate: newBeginDate => setBeginDate(newBeginDate),
    endDate: newEndDate => setEndDate(newEndDate),
  };

  const getBetHistoryByFilters = () => {
    getBetHistory({
      begin: dayjs(beginDate).format('DDMMYYYY'),
      end: dayjs(endDate).format('DDMMYYYY'),
      count: 10,
      periodType: 0,
      showLossBets,
      showWinBets,
      showWorkBets,
      page,
    });
  };

  const onCartClick = betId => {
    onSetSellBetId(betId);
    onSetSellBetModalOpen(true);
  };

  useEffect(() => {
    getBetHistoryByFilters();
    getUserCashoutBets();
  }, [page, locale]);

  useEffect(() => {
    getUserInfo();
  }, []);

  const fullName = `${firstName} ${lastName}`;

  const items = bets.map(bet => bet.countEvents === 1 ?
    <SingleItem
      key={bet.id}
      bet={bet}
      locale={locale}
      onCartClick={onCartClick}
      cashoutBets={cashoutBets}
      fullName={fullName}
      isActiveUseName={isActiveUseName}
      currency={currency} /> :
    <MultiItem
      key={bet.id}
      bet={bet}
      onCartClick={onCartClick}
      locale={locale}
      getBetContent={getBetContent}
      cashoutBets={cashoutBets}
      currency={currency}
      fullName={fullName}
      isActiveUseName={isActiveUseName}
      betContents={betContents}
    />);

  const b = block('bet-history');
  return (
    <React.Fragment>
      {isSellBetModalOpen && <BottomPopUp closeFunction={() => onSetSellBetModalOpen(false)}>
        <SellBet
          actionProcessing={actionProcessing}
          sellBetId={sellBetId}
          locale={locale}
          cashoutBets={cashoutBets}
          currency={currency}
          closeFunction={() => onSetSellBetModalOpen(false)}
          sellBet={sellBet}
          getBetHistory={getBetHistoryByFilters} />
      </BottomPopUp>}
      <BackBlock>
        <BackBlockContent title={locale.betHistory} changeOpenFilter={changeOpenFilter} />
      </BackBlock>
      <section className={b()}>
        <Spinner isLoading={actionProcessing} />
        <div className={b('filter')}>
          {isFiltersOpen ? <BetsFilter
            locale={locale}
            showWinBets={showWinBets}
            showLossBets={showLossBets}
            showWorkBets={showWorkBets}
            beginDate={beginDate}
            endDate={endDate}
            methodsToChangeValues={methodsToChangeValues}
            onSubmit={getBetHistoryByFilters}
          /> : null}
        </div>
        <div className={b('bets')}>
          {items}
        </div>
        <div className={b('paginator')}>
          <Paginator
            count={count}
            currentPage={page}
            locale={locale}
            onPageClick={onPageClick}
          />
        </div>
      </section>
    </React.Fragment>
  );
};

BetHistory.propTypes = {
  locale: PropTypes.object.isRequired,
  bets: PropTypes.array.isRequired,
  actionProcessing: PropTypes.bool.isRequired,
  betContents: PropTypes.object.isRequired,
  cashoutBets: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  isActiveUseName: PropTypes.bool.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,

  getBetHistory: PropTypes.func.isRequired,
  getBetContent: PropTypes.func.isRequired,
  getUserCashoutBets: PropTypes.func.isRequired,
  sellBet: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  locale: state.locale.betHistory,
  bets: state.betHistory.bets,
  cashoutBets: state.betHistory.cashoutBets,
  actionProcessing: state.betHistory.actionProcessing,
  betContents: state.betHistory.betContents,
  count: state.betHistory.count,
  currency: state.auth.user.currency,
  firstName: state.profile.user.firstName,
  lastName: state.profile.user.lastName,
  isActiveUseName: state.userSettings.isActiveUseName,
});

const mapDispatchToProps = dispatch => {
  const actions = {
    getBetHistory: betHistoryActions.getBetHistory,
    getBetContent: betHistoryActions.getBetContent,
    getUserCashoutBets: betHistoryActions.getUserCashoutBets,
    sellBet: betHistoryActions.sellBet,
    getUserInfo: profileActions.getUserInfo,
  };
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BetHistory);
