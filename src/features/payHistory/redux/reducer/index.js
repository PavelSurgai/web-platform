import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return { ...state, actionProcessing: true };

    case actionTypes.ACTION_FAILURE:
      return { ...state, actionProcessing: false };

    case actionTypes.GET_PAYHISTORY:
      return { ...state, history: action.payload, actionProcessing: false };

    default:
      return { ...state };
  }
}