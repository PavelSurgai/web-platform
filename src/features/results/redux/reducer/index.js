import { actionTypes } from '../actions';
import { initialState } from '../initial';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return { ...state, actionProcessing: true };

    case actionTypes.ACTION_FAILURE:
      return { ...state, actionProcessing: false };

    case actionTypes.GET_SPORTS:
      return { ...state, sports: action.payload, actionProcessing: false };

    case actionTypes.GET_TOURNAMENTS:
      return { ...state, tournaments: action.payload, actionProcessing: false };

    case actionTypes.GET_RESULTS:
      return { ...state, results: action.payload, actionProcessing: false };

    default:
      return { ...state };
  }
}