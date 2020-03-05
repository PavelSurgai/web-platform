import { addNotify } from 'features/notify';

const actionTypes = {
  GET_BET_HISTORY: 'betHistory/GET_BET_HISTORY',
  ACTION_PROCESSING: 'betHistory/ACTION_PROCESSING',
  ACTION_FAILURE: 'betHistory/ACTION_FAILURE',
  GET_BET_CONTENT: 'betHistory/GET_BET_CONTENT',
  GET_CASHOUT_BETS: 'betHistory/GET_CASHOUT_BETS',
  SELL_BET_SUCCESS: 'betHistory/SELL_BET_SUCCESS',
};

function getBetHistory(info) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const response = await api.betHistory.getBetHistory(info);
    if (response.success) {
      dispatch({ type: actionTypes.GET_BET_HISTORY, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

function getBetContent(id) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const response = await api.betHistory.getBetContent(id);
    if (response.success) {
      dispatch({ type: actionTypes.GET_BET_CONTENT, payload: { [id]: response.data } });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

function getUserCashoutBets() {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const { lang } = getState().userSettings;
    const response = await api.betHistory.getUserCashoutBets(lang);
    if (response.success) {
      dispatch({ type: actionTypes.GET_CASHOUT_BETS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

function sellBet(betId, betCode, callBack = t => t) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const locale = getState().locale.betHistory;
    const { api } = extra;
    const response = await api.betHistory.sellBet(betId, betCode);
    if (response.success) {
      dispatch({ type: actionTypes.SELL_BET_SUCCESS });
      dispatch(addNotify(locale.betSoldSuccess, 'success'));
      callBack();
    } else {
      dispatch(addNotify(response.errorMessage, 'error'));
      dispatch({ type: actionTypes.ACTION_FAILURE });
    }
  };
}

export {
  actionTypes,
  getBetHistory,
  getBetContent,
  sellBet,
  getUserCashoutBets,
};