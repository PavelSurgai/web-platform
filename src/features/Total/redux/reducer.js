import { initialState } from './initial';
import { actionTypes } from './actions';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return { ...state, actionProcessing: action.payload };
    case actionTypes.GET_TOTAL_SUCCESS:
      return { ...state, actionProcessing: false, totalInfo: action.payload }
    default: return { ...state };
  }
}
