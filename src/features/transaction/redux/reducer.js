import { actionTypes } from './actions';
import { initialState } from './initial';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return {
        ...state,
        actionProcessing: action.payload,
      };
    case actionTypes.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        actionProcessing: false,
        transactions: action.payload,
      };

    default:
      return { ...state };
  }
}