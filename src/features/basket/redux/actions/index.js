
import { addNotify } from 'features/notify';
import { basketTypes } from '../../data/basketTypes';
import {
  addToRemoteBasket,
  removeFromRemoteBasket,
  clearRemoteBasket,
  loadRemoteBasket,
  changeTypeToRemoteBasket,
} from './manageRemoteBets';
import {
  addToLocalStorage,
  removeFromLocalStorage,
  clearLocalBasket,
  loadLocalBasket,
} from './manageLocalBets';

const actionTypes = {
  CHANGE_BETSLIP_TYPE: 'basket/CHANGE_BETSLIP_TYPE',
  ADD_TO_BASKET: 'basket/ADD_TO_BASKET',
  REMOVE_FROM_BASKET: 'basket/REMOVE_FROM_BASKET',
  CLEAR_BASKET: 'basket/CLEAR_BASKET',
  LOAD_USER_BETSLIP: 'basket/LOAD_USER_BETSLIP',
  BASKET_PROCESSING: 'basket/BASKET_PROCESSING',
  BASKET_SUCCESS: 'basket/BASKET_SUCCESS',
  BASKET_FAILURE: 'basket/BASKET_FAILURE',
  ADD_ERROR_BETS: 'basket/ADD_ERROR_BETS',
  CHANGE_SYSTEM_TYPE: 'basket/CHANGE_SYSTEM_TYPE',
  GET_LIMITATIONS: 'basket/GET_LIMITATIONS',
  CHANGE_IS_ONE_CLICK: 'basket/CHANGE_IS_ONE_CLICK',
  CHANGE_AMOUNT_ONE_CLICK: 'basket/CHANGE_AMOUNT_ONE_CLICK',
  ADD_TEMP_BETS: 'basket/ADD_TEMP_BETS',
  RETURN_TEMP_BETS: 'basket/RETURN_TEMP_BETS',
  CHANGE_BASKET_PROCESSING: 'basket/CHANGE_BASKET_PROCESSING',
  CHANGE_OPEN_BASKET_MODAL: 'basket/CHANGE_OPEN_BASKET_MODAL',
};

function addToBasket(newBet) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { bets, isOneClick, basketProcessing } = getState().basket;
    const { isAuth } = getState().auth;
    if (!basketProcessing) {
      dispatch({ type: actionTypes.BASKET_PROCESSING });
      if (isOneClick) {
        dispatch(makeOneClickBet(newBet));
      } else {
        const indexToReplace = bets.findIndex(bet => bet.betslipInfo.eId === newBet.betslipInfo.eId);
        const indexToRemove = bets.findIndex(bet => bet.ID === newBet.ID);
        if (indexToRemove !== -1) await _remove(dispatch, getState, api, isAuth, bets[indexToRemove]);
        else if (indexToReplace !== -1) {
          await _remove(dispatch, getState, api, isAuth, bets[indexToReplace]);
          await _add(dispatch, getState, api, isAuth, newBet);
        } else {
          await _add(dispatch, getState, api, isAuth, newBet);
        }
  
        await _changeBasketType(dispatch, getState);
        await dispatch(getLimitations());
        dispatch({ type: actionTypes.BASKET_SUCCESS });
      }
    }
  };
}

function removeFromBasket(bet) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { bets } = getState().basket;
    const { isAuth } = getState().auth;

    const index = bets.findIndex(b => b.ID === bet.ID);
    await _remove(dispatch, getState, api, isAuth, bets[index]);

    await _changeBasketType(dispatch, getState);
    await dispatch(getLimitations());
  };
}

function clearBasket() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { isAuth } = getState().auth;
    const { lang } = getState().userSettings;
    const clearFunc = isAuth ? clearRemoteBasket : clearLocalBasket;
    await clearFunc(api, lang);
    dispatch({ type: actionTypes.CLEAR_BASKET });

    _changeBasketType(dispatch, getState);
  };
}

function loadBasketContent() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { isAuth } = getState().auth;
    const loadFunc = isAuth ? loadRemoteBasket : loadLocalBasket;
    const basket = await loadFunc(api);
    dispatch({ type: actionTypes.LOAD_USER_BETSLIP, payload: { bets: basket.bets } });

    _changeBasketType(dispatch, getState);
  };
}

function makeOneClickBet(coef) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.BASKET_PROCESSING });
    const { api } = extra;
    const { isAuth } = getState().auth;
    const { lang } = getState().userSettings;
    const { amountOneClick } = getState().basket;
    const locale = getState().locale.basket;
    const { errorStatusMessage } = getState().locale;

    if (isAuth) {
      const statuses = { [coef.ID]: true };
      const requestData = {
        betAmount: +amountOneClick,
        doAcceptOddsChanges: true,
        statuses,
        systemIndex: -1,
      };

      dispatch(addTempBets());
      await clearRemoteBasket(api, lang);
      await _add(dispatch, getState, api, isAuth, coef);
      await changeTypeToRemoteBasket(api, basketTypes.SINGLE);

      const retryFunction = i => {
        setTimeout(async () => {
          const response = await api.basket.makeBet(requestData, lang);
          const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
            errorStatusMessage[response.codeStatus] : errorStatusMessage.defaultMessage;
          if (response.success) {
            dispatch(addNotify(locale.betSuccess, 'success'));
            await dispatch(clearBasket());
            dispatch(localBasketConnectToRemoteBasket(true));
          } else if (i <= 3) retryFunction(i + 1);
          else {
            dispatch(addNotify(errorMessage, 'error'));
            if (response.data) dispatch({ type: actionTypes.ADD_ERROR_BETS, payload: response.data });
            dispatch(localBasketConnectToRemoteBasket(true));
            dispatch({ type: actionTypes.BASKET_FAILURE });
          }
        }, 1000);
      };
      retryFunction(1);
    }
  };
}

function addTempBets() {
  return async (dispatch, getState, extra) => {
    const { bets } = getState().basket;
    dispatch({ type: actionTypes.ADD_TEMP_BETS, payload: bets });
  };
}
  
const changeBasketProcessing = value => async dispatch =>
  dispatch({ type: actionTypes.CHANGE_BASKET_PROCESSING, payload: value });

function makeBet(betType, commonAmount, coefs, acceptChanges = false, systemIndex = -1, isBonus = false) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.BASKET_PROCESSING });
    const { api } = extra;
    const state = getState();
    const { lang } = state.userSettings;
    const locale = state.locale.basket;
    const bonusPercent = state.userSettings.limits.bonus.maxBonusPercent;
    const { errorStatusMessage } = state.locale;

    const statuses = {};
    if (betType === basketTypes.SINGLE) {
      statuses[coefs[0].ID] = true;
    } else {
      coefs.forEach(coef => {
        statuses[coef.ID] = true;
      });
    }

    const totalCoef = coefs.reduce((total, coef) => total * +coef.rate.decimal, 1);

    const requestData = {
      realAmount: commonAmount,
      doAcceptOddsChanges: acceptChanges,
      statuses,
      systemIndex,
      totalCoef,
      bonusAmount: isBonus ? commonAmount * bonusPercent : 0,
    };

    const response = await api.basket.makeBet(requestData, lang);
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] : errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch(addNotify(locale.betSuccess, 'success'));
      dispatch(clearBasket());
      dispatch({ type: actionTypes.BASKET_SUCCESS });
      _changeBasketType(dispatch, getState);
    } else {
      dispatch(addNotify(errorMessage, 'error'));
      if (response.data) dispatch({ type: actionTypes.ADD_ERROR_BETS, payload: response.data });
      else dispatch(changeBasketProcessing(false));
    }
  };
}

const changeIsOneClick = value => async dispatch =>
  dispatch({ type: actionTypes.CHANGE_IS_ONE_CLICK, payload: value });

const changeaamountOneClick = value => async dispatch =>
  dispatch({ type: actionTypes.CHANGE_AMOUNT_ONE_CLICK, payload: value });

function changeRemoteBasketType(betslipType) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { isAuth } = getState().auth;
    if (isAuth) changeTypeToRemoteBasket(api, betslipType);
  };
}

function getLimitations() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    await _requestLimits(getState, api, dispatch);
  };
}

async function _add(dispatch, getState, api, isAuth, bet) {
  if (isAuth) {
    const response = await addToRemoteBasket(getState, api, bet);
    if (response.success) {
      await dispatch({ type: actionTypes.ADD_TO_BASKET, payload: response.data });
    } else {
      await dispatch({ type: actionTypes.ADD_TO_BASKET, payload: bet });
    }
  } else {
    await dispatch({ type: actionTypes.ADD_TO_BASKET, payload: bet });
    await addToLocalStorage(getState, api, bet);
  }
}

async function _remove(dispatch, getState, api, isAuth, bet) {
  const removeFunc = isAuth ? removeFromRemoteBasket : removeFromLocalStorage;
  await dispatch({ type: actionTypes.REMOVE_FROM_BASKET, payload: bet });
  await removeFunc(getState, api, bet);
}

async function _changeBasketType(dispatch, getState) {
  const betsLength = getState().basket.bets.length;
  const currentType = getState().basket.basketType;

  let betslipType = basketTypes.SINGLE;
  if (betsLength >= 2) betslipType = basketTypes.EXPRESS;
  if (currentType !== betslipType) dispatch(changeRemoteBasketType(betslipType));
  dispatch({ type: actionTypes.CHANGE_BETSLIP_TYPE, payload: betslipType });
}

async function _requestLimits(getState, api, dispatch) {
  const { isAuth } = getState().auth;
  if (!isAuth) return;

  const response = await api.basket.getLimits();
  if (response.success && response.data !== null) {
    dispatch({ type: actionTypes.GET_LIMITATIONS, payload: response.data });
  }
}

function setBasketType(type) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    dispatch({ type: actionTypes.CHANGE_BETSLIP_TYPE, payload: type });
    await _requestLimits(getState, api, dispatch);
  };
}

function localBasketConnectToRemoteBasket(isTemp) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.BASKET_PROCESSING });
    const { api } = extra;
    const { bets } = getState().basket;
    const { tempBets } = getState().basket;
    const newBets = isTemp ? tempBets : bets;
    const response = await Promise.all(newBets.map(async bet => {
      const result = await addToRemoteBasket(getState, api, bet);
      return result.data;
    }));
    if (isTemp) dispatch({ type: actionTypes.RETURN_TEMP_BETS, payload: newBets });
    // dispatch({ type: actionTypes.ADD_ERROR_BETS, payload: response });
    clearLocalBasket();
  };
}

function remoteBasketConnectToLocalBasket() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { bets } = getState().basket;
    const { lang } = getState().userSettings;
    bets.forEach(bet => {
      addToLocalStorage(getState, api, bet);
    });
    clearRemoteBasket(api, lang);
  };
}

export {
  actionTypes,
  addToBasket,
  setBasketType,
  removeFromBasket,
  clearBasket,
  loadBasketContent,
  makeBet,
  changeRemoteBasketType,
  getLimitations,
  localBasketConnectToRemoteBasket,
  remoteBasketConnectToLocalBasket,
  changeIsOneClick,
  changeaamountOneClick,
};
