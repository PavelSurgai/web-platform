import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SVGInline from 'react-svg-inline';


import NotAuthorized from 'components/NotAuthorized/mobile';
import Spinner from 'components/Spinner';
import BackBlock from 'components/BackBlock/mobile';
import Button from 'components/Button/mobile';
import Modal from 'components/Modal/mobile';
import BasketModel from '../../../model/BasketModel';
import { actions } from '../../../redux';
import EmptyBasket from '../EmptyBasket';
import BasketHeader from './BasketHeader';
import BasketType from './BasketType';
import BasketBetList from './BasketBetList';
import BasketInfo from './BasketInfo';
import { BasketTicketBottom } from './BasketTicketBottom/BasketTicketBottom';
import { BonusInfo } from './BonusInfo/BonusInfo';
import { basketTypes } from '../../../data/basketTypes';
import TrashSVG from '../../img/trash.svg';

import './Basket.scss';

class Basket extends React.Component {
  constructor(props) {
    super(props);
    this.model = new BasketModel();
    this.state = {
      isBonus: false,
      isBonusInfoOpen: false,
      isAccept: false,
      amount: 0,
      totalCoef: {},
      correctedLimits: {
        min: null,
        max: null,
        default: null,
      },
    };
  }

  static propTypes = {
    lang: PropTypes.string.isRequired,
    locale: PropTypes.object,
    basketType: PropTypes.shape({
      ID: PropTypes.number,
      textID: PropTypes.string,
    }),
    bets: PropTypes.arrayOf(PropTypes.object).isRequired,
    removeFromBasket: PropTypes.func.isRequired,
    loadBasketContent: PropTypes.func.isRequired,
    changeRemoteBasketType: PropTypes.func.isRequired,
    getLimitations: PropTypes.func.isRequired,
    clearBasket: PropTypes.func.isRequired,
    makeBet: PropTypes.func.isRequired,
    currency: PropTypes.string.isRequired,
    limits: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }).isRequired,
    limitsBetroute: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }).isRequired,
    oddType: PropTypes.string.isRequired,
    isAuth: PropTypes.bool.isRequired,
    basketProcessing: PropTypes.bool.isRequired,
    localeCommon: PropTypes.object.isRequired,
    bonusLimits: PropTypes.object.isRequired,
  }

  componentDidMount = () => this.setState({ correctedLimits: this._getCorrectedLimits(this.props) })

  componentWillMount() {
    this.props.loadBasketContent()
      .then(() => this.props.getLimitations())
      .then(() => this.setState({ amount: this.props.limits.min }));
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { lang, loadBasketContent, getLimitations, bets, changeRemoteBasketType, basketType, isAuth, limitsBetroute } = this.props;
    const { amount } = nextState;
    if (lang !== nextProps.lang) {
      loadBasketContent();
    }
    if (amount < nextProps.limitsBetroute.min && limitsBetroute.min !== nextProps.limitsBetroute.min) {
      this.setState({ amount: nextProps.limitsBetroute.min });
    }
    if (bets.length !== nextProps.bets.length || limitsBetroute.max !== nextProps.limitsBetroute.max) {
      this.setState({ totalCoef: this.model.getTotalCoef(bets), correctedLimits: this._getCorrectedLimits(nextProps) });
    }
    if (bets.length && nextProps.bets.length !== 0 && bets[bets.length - 1].max === undefined && nextProps.bets[nextProps.bets.length - 1].max !== undefined) {
      this.setState({ correctedLimits: this._getCorrectedLimits(nextProps) });
    }
    if (nextProps.isAuth && !isAuth) {
      loadBasketContent()
        .then(() => getLimitations());
    }
    if (nextProps.isAuth !== isAuth) {
      this._transportBets(nextProps)
        .then(() => { if (isAuth) getLimitations(); });
    }
  }

  onMakeBetClick = () => {
    const { makeBet, bets, basketType } = this.props;
    const { isAccept, amount, isBonus } = this.state;
    makeBet(basketType, amount, bets, isAccept, -1, isBonus);
  }

  onBonusInfoClick = value => this.setState({ isBonusInfoOpen: value })

  render() {
    const b = block('basket');
    const { locale, bets, basketType, removeFromBasket, currency,
      clearBasket, basketProcessing, oddType, localeCommon, bonusLimits, isAuth, authLocale } = this.props;
    const { isAccept, amount, correctedLimits, isBonus, isBonusInfoOpen } = this.state;
    const totalCoef = this.model.getTotalCoef(bets);
    const betAmount = isBonus ? amount + (bonusLimits.maxBonusPercent * amount) : amount;
    const possiblePrize = totalCoef && (totalCoef.decimal * betAmount).toFixed(2);
    return (
      <React.Fragment>
        {!isAuth ? <NotAuthorized locale={authLocale} /> :
        <React.Fragment>
          <BackBlock>
            <div className={b('back-block')}>
              <span>{localeCommon.basket}</span>
              <SVGInline
                className={b('trash-icon')}
                onClick={clearBasket}
                svg={TrashSVG}
                />
            </div>
          </BackBlock>

          {isBonusInfoOpen && <BonusInfo
            locale={locale}
            bonusLimits={bonusLimits}
            isAuth={isAuth}
            closeFunction={() => this.onBonusInfoClick(false)}
            />}

          <article className={b()}>
            {bets.length !== 0 ? (<React.Fragment>
              <Spinner isLoading={basketProcessing} />
              <div className={b('coupon')}>
                <BasketType
                  locale={locale}
                  types={basketTypes}
                  tempType={basketType}
                  onRemoveClick={clearBasket}
                  />
                <BasketBetList
                  oddType={oddType}
                  bets={bets}
                  removeFromBasket={removeFromBasket}
                  />
                <BasketTicketBottom
                  amount={+betAmount}
                  totalCoef={totalCoef[oddType]}
                  currency={currency}
                  locale={locale}
                  possible={+possiblePrize}
                  />
              </div>

              <div className={b('info')}>
                <BasketInfo
                  actionProcessing={basketProcessing}
                  oddType={oddType}
                  locale={locale}
                  coef={totalCoef}
                  amount={amount}
                  limits={correctedLimits}
                  currency={currency}
                  possiblePrize={+possiblePrize}
                  icAcceptChangeCoefs={isAccept}
                  isBonus={isBonus}
                  changeAmount={this.changeAmount}
                  changeAccept={this.changeIsAccept}
                  changeIsBonus={this.changeIsBonus}
                  openBonusInfo={() => this.onBonusInfoClick(true)}
                  bonusPercent={bonusLimits.maxBonusPercent}
                  onMakeBetClick={this.onMakeBetClick}
                  />
              </div>
            </React.Fragment>) :
            <EmptyBasket locale={locale} />}
          </article>
        </React.Fragment>
        }
      </React.Fragment>
    );
  }

  async _transportBets(props) {
    const { isAuth, localBasketConnectToRemoteBasket, changeRemoteBasketType,
      remoteBasketConnectToLocalBasket, basketType } = props;
    if (isAuth) {
      await localBasketConnectToRemoteBasket();
      changeRemoteBasketType(basketType);
    } else {
      await remoteBasketConnectToLocalBasket();
    }
  }

  changeIsAccept = value => this.setState({ isAccept: value });

  changeIsBonus = value => this.setState({ isBonus: value });

  changeAmount = e => {
    const { correctedLimits } = this.state;
    let filterValue = e.currentTarget.value &&
      +e.currentTarget.value.toString().split('').filter(temp => +temp === +temp).join('');
    filterValue = filterValue !== undefined ? filterValue : 0;
    const currectedBet = filterValue <= correctedLimits.max ? filterValue : correctedLimits.max;
    this.setState({ amount: currectedBet });
  }

  _getCorrectedLimits = nextProps => {
    const { limits, limitsBetroute } = nextProps;
    return this.model.getCorrectedLimits(limitsBetroute, limits);
  }
}


const mapStateToProps = state => ({
  lang: state.userSettings.lang,
  oddType: state.userSettings.oddType,
  locale: state.locale.basket,
  localeCommon: state.locale.common,
  authLocale: state.locale.auth,
  sports: state.live.sports,
  bets: state.basket.bets,
  limitsBetroute: state.basket.limits,
  limits: state.userSettings.limits.bets,
  basketType: state.basket.basketType,
  currency: state.auth.user.currency,
  isAuth: state.auth.isAuth,
  bonusLimits: state.userSettings.limits.bonus,
  basketProcessing: state.basket.basketProcessing,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
