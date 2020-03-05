import { actionTypes } from '../actions';
import { initialState } from '../initial';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return { ...state, actionProcessing: true };

    case actionTypes.ACTION_FAILURE:
      return { ...state, actionProcessing: false };

    case actionTypes.GET_BET_HISTORY:
      return { ...state, bets: action.payload.bets, actionProcessing: false, count: action.payload.count };

    case actionTypes.GET_BET_CONTENT:
      return { ...state, betContents: { ...state.betContents, ...action.payload }, actionProcessing: false };

    case actionTypes.GET_CASHOUT_BETS:
      return { ...state, cashoutBets: action.payload, actionProcessing: false };

    case actionTypes.SELL_BET_SUCCESS:
      return { ...state, actionProcessing: false };

    default:
      return { ...state };
  }
}