import { actionTypes } from '../actions';
import initialState from '../initial';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return {
        ...state,
        actionProcessing: action.payload,
      };
      
    default:
      return state;
  }
}

export default reducer;
