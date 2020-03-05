import React from 'react';
import PropTypes from 'prop-types';
import block from 'bem-cn';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'components/Spinner';

import { actions } from '../../../redux';
import BasketModel from '../../../model/BasketModel';

import Button from 'components/Button/desktop';
import Modal from 'components/Modal/desktop';
import EmptyBasket from '../EmptyBasket';
import BasketHeader from './BasketHeader';
import BasketType from './BasketType';
import BasketBetList from './BasketBetList';
import BasketInfo from './BasketInfo';
import { BonusInfo } from './BonusInfo/BonusInfo';
import { basketTypes } from '../../../data/basketTypes';

import './Basket.scss';

class Basket extends React.Component {
  constructor(props, ref) {
    super(props);
    this.model = new BasketModel();
    this.state = {
      isBonus: false,
      isAccept: false,
      amount: 0,
      totalCoef: {},
      correctedLimits: {
        min: null,
        max: null,
        default: null,
      },
      isBonusInfoOpen: false,
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
    currency: PropTypes.string,
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
    bonusLimits: PropTypes.object.isRequired,
    innerRef: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.loadBasketContent()
      .then(() => this.props.getLimitations())
      .then(() => this.setState({ amount: this.props.limits.min }));
  }

  componentWillUpdate = (nextProps, nextState) => {
    const { lang, loadBasketContent, getLimitations, bets,
      changeRemoteBasketType, basketType, isAuth, limitsBetroute } = this.props;
    const { amount } = nextState;
    if (lang !== nextProps.lang) {
      loadBasketContent();
    }
    if (amount < nextProps.limitsBetroute.min && limitsBetroute.min !== nextProps.limitsBetroute.min) {
      this.setState({ amount: nextProps.limitsBetroute.min });
    }
    if (bets.length !== nextProps.bets.length || limitsBetroute.max !== nextProps.limitsBetroute.max) {
      this.setState({ totalCoef: this.model.getTotalCoef(nextProps.bets), correctedLimits: this._getCorrectedLimits(nextProps) });
    }
    if (bets.length && nextProps.bets.length !== 0 && bets[bets.length - 1].max === undefined &&
      nextProps.bets[nextProps.bets.length - 1].max !== undefined) {
      this.setState({ correctedLimits: this._getCorrectedLimits(nextProps) });
    }
    if (basketType.ID !== nextProps.basketType.ID) {
      changeRemoteBasketType(nextProps.basketType);
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
      clearBasket, oddType, bonusLimits, basketProcessing, isAuth, innerRef } = this.props;
    const { isAccept, amount, correctedLimits, isBonus, isBonusInfoOpen } = this.state;
    const totalCoef = this.model.getTotalCoef(bets);
    const possiblePrize = totalCoef && +(totalCoef.decimal * amount).toFixed(2);
    return (
      <article className={b()} ref={innerRef}>
        {isBonusInfoOpen ? <Modal closeFunction={() => this.onBonusInfoClick(false)} widthContent="20rem">
          <BonusInfo locale={locale} bonusLimits={bonusLimits} isAuth={isAuth} />
        </Modal> : null}
        {bets.length !== 0 ? (<React.Fragment>
          <Spinner isLoading={basketProcessing} />
          <BasketHeader locale={locale} />
          <div className={b('scroll-block')}>
            <BasketType locale={locale} types={basketTypes} tempType={basketType} isAuth={isAuth} />
            <BasketBetList oddType={oddType} bets={bets} removeFromBasket={removeFromBasket} />
            <BasketInfo
              oddType={oddType}
              locale={locale}
              coef={totalCoef}
              amount={amount}
              limits={correctedLimits}
              currency={currency}
              possiblePrize={possiblePrize}
              icAcceptChangeCoefs={isAccept}
              isBonus={isBonus}
              bonusPercent={bonusLimits.maxBonusPercent}
              changeAmount={this.changeAmount}
              changeAccept={this.changeIsAccept}
              changeIsBonus={this.changeIsBonus}
              openBonusInfo={() => this.onBonusInfoClick(true)}
              setMaxToAmount={this.setMaxToAmount} />
          </div>
          <div className={b('buttons')}>
            <div className={b('button')}>
              <Button
                text={locale.makeBet}
                color="green"
                callBack={this.onMakeBetClick}
                disabled={amount < correctedLimits.min || basketProcessing} />
            </div>
            <div className={b('button')}>
              <Button
                text={locale.clearBasket}
                color="blue"
                callBack={clearBasket} />
            </div>
          </div>
        </React.Fragment>) :
          <EmptyBasket locale={locale} />}
      </article>
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

  setMaxToAmount = () => this.setState(state => ({ amount: state.correctedLimits.max }));

  changeIsAccept = value => this.setState({ isAccept: value });

  changeIsBonus = value => this.setState({ isBonus: value });

  changeAmount = e => {
    const { correctedLimits } = this.state;
    const filterValue = +e.currentTarget.value.toString().split('').filter(temp => +temp === +temp || temp === '.').join('');
    const currectedBet = filterValue <= correctedLimits.max ? filterValue : correctedLimits.max;
    this.setState({ amount: currectedBet });
  }

  _getCorrectedLimits = nextProps => {
    const { limits, limitsBetroute } = nextProps;
    return this.model.getCorrectedLimits(limitsBetroute, limits);
  }
}


function mapStateToProps(state) {
  return {
    lang: state.userSettings.lang,
    oddType: state.userSettings.oddType,
    locale: state.locale.basket,
    sports: state.live.sports,
    bets: state.basket.bets,
    limitsBetroute: state.basket.limits,
    limits: state.userSettings.limits.bets,
    basketType: state.basket.basketType,
    basketProcessing: state.basket.basketProcessing,
    currency: state.auth.user.currency,
    isAuth: state.auth.isAuth,
    bonusLimits: state.userSettings.limits.bonus,
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const ConnectedBasket = connect(mapStateToProps, mapDispatchToProps)(Basket);

export default React.forwardRef((props, ref) => <ConnectedBasket innerRef={ref} {...props} />);
