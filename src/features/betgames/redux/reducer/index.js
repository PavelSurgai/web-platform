import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return { ...state, actionProcessing: true };

    case actionTypes.ACTION_FAILURE:
      return { ...state, actionProcessing: false, token: '-' };

    case actionTypes.GET_TOKEN:
      return { ...state, token: action.payload, actionProcessing: false };

    default:
      return { ...state };
  }
}