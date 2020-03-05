import initialState from '../initial';
import { actionTypes } from '../actions';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_ADVERTISING_SUCCESS:
      return {
        ...state,
        advertising: action.payload,
      };

    default: return state;
  }
}

export default reducer;
