import React from 'react';
import block from 'bem-cn';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dayjs from 'dayjs';
import SVGInline from 'react-svg-inline';

import Spinner from 'components/Spinner';
import Modal from 'components/Modal/desktop';
import { SellBet } from './SellBet';
import { BetsFilter } from './BetsFilter';
import { SingleItem } from './SingleItem';
import { MultiItem } from './MultiItem';
import { Paginator } from './Paginator';
import { actions as betHistoryActions } from '../../redux';

import ArrowSVG from './img/arrow.svg';
import './BetHistory.scss';

class BetHistory extends React.Component {
  state = {
    showWinBets: true,
    showLossBets: true,
    showWorkBets: true,
    page: 0,
    beginDate: dayjs().add(-1, 'month').format('YYYY-MM-DD'),
    endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    isFiltersOpen: true,
    sellBetId: null,
    isSellBetModalOpen: false,
  }

  static propTypes = {
    locale: PropTypes.object.isRequired,
    cashoutBets: PropTypes.object.isRequired,
    bets: PropTypes.array.isRequired,
    actionProcessing: PropTypes.bool.isRequired,
    currency: PropTypes.string.isRequired,
    betContents: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,

    getBetHistory: PropTypes.func.isRequired,
    getBetContent: PropTypes.func.isRequired,
    getUserCashoutBets: PropTypes.func.isRequired,
    sellBet: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.getBetHistoryByFilters();
  }

  onPageClick = page => this.setState({ page }, this.getBetHistoryByFilters);

  onChangeChecked = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.checked });
  }

  onChangeValue = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }

  onCartClick = betId => {
    this.props.getUserCashoutBets();
    this.setState({ isSellBetModalOpen: true, sellBetId: betId });
  }

  render() {
    const b = block('bet-history');
    const { locale, bets, actionProcessing, getBetContent, betContents, count, cashoutBets, sellBet, currency } = this.props;
    const { showLossBets, showWinBets, showWorkBets, beginDate, endDate, page, isFiltersOpen, sellBetId, isSellBetModalOpen } = this.state;
    const items = bets.map(bet => {
      return bet.countEvents === 1 ? <SingleItem key={bet.id} bet={bet} locale={locale} onCartClick={this.onCartClick} /> :
      <MultiItem
        key={bet.id}
        onCartClick={this.onCartClick}
        bet={bet}
        locale={locale}
        getBetContent={getBetContent}
        betContents={betContents}
      />;
    });
    return (
      <section className={b()}>
        {isSellBetModalOpen && <Modal closeFunction={() => this.setState({ isSellBetModalOpen: false })}>
          <SellBet
            actionProcessing={actionProcessing}
            sellBetId={sellBetId}
            locale={locale}
            cashoutBets={cashoutBets}
            currency={currency}
            closeFunction={() => this.setState({ isSellBetModalOpen: false })}
            sellBet={sellBet}
            getBetHistory={this.getBetHistoryWithoutInfo} />
        </Modal>
        }
        <Spinner isLoading={actionProcessing} />
        <div className={b('top')}>
          <div className={b('top-left')}>
            <h4 className={b('title')}>{locale.betHistory}</h4>
          </div>
          <div className={b('top-center')}>
            {isFiltersOpen ? <BetsFilter
              locale={locale}
              showWinBets={showWinBets}
              showLossBets={showLossBets}
              showWorkBets={showWorkBets}
              beginDate={beginDate}
              endDate={endDate}
              onChangeChecked={this.onChangeChecked}
              onChangeValue={this.onChangeValue}
              onSubmit={this.getBetHistoryByFilters}
            /> : null}
          </div>
          <div className={b('top-right')}>
            <div
              className={b('filter-button', { open: isFiltersOpen })}
              onClick={() => this.setState({ isFiltersOpen: !isFiltersOpen })}
            >
              {isFiltersOpen ? locale.hideFilters : locale.showFilters}
              <SVGInline className={b('filter-button-icon').toString()} svg={ArrowSVG} />
            </div>
            <Paginator
              count={count}
              currentPage={page}
              locale={locale}
              onPageClick={this.onPageClick}
            />
          </div>
        </div>

        <div className={b('bets-table')}>
          <div className={b('bets-table-header')}>
            <div className={b('bets-table-cell', { type: 'date' })}>{locale.date}</div>
            <div className={b('bets-table-cell', { type: 'bet' })}>{locale.bet}</div>
            <div className={b('bets-table-cell', { type: 'outcome' })}>{locale.outcome}</div>
            <div className={b('bets-table-cell', { type: 'amount' })}>{locale.amount}</div>
            <div className={b('bets-table-cell', { type: 'odd' })}>{locale.coefShort}</div>
            <div className={b('bets-table-cell', { type: 'possible' })}>{locale.resultWin}</div>
            <div className={b('bets-table-cell', { type: 'code' })}>Bet code</div>
            <div className={b('bets-table-cell', { type: 'cart' })} />
          </div>
          {items}
        </div>
      </section>
    );
  }

  getBetHistoryWithoutInfo = () => {
    this.getBetHistoryByFilters();
  }

  getBetHistoryByFilters = () => {
    const { showLossBets, showWinBets, showWorkBets, beginDate, endDate, page } = this.state;
    this.props.getBetHistory({
      begin: dayjs(beginDate).format('DDMMYYYY'),
      end: dayjs(endDate).format('DDMMYYYY'),
      count: 10,
      periodType: 0,
      showLossBets,
      showWinBets,
      showWorkBets,
      page,
    });
  }
}

function mapStateToProps(state) {
  return {
    locale: state.locale.betHistory,
    bets: state.betHistory.bets,
    actionProcessing: state.betHistory.actionProcessing,
    betContents: state.betHistory.betContents,
    cashoutBets: state.betHistory.cashoutBets,
    count: state.betHistory.count,
    currency: state.auth.user.currency,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    ...betHistoryActions,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BetHistory);