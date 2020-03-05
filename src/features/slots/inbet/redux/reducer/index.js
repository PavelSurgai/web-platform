import { actionTypes } from '../actions';
import initialState from '../initial';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return {
        ...state,
        actionProcessing: true,
        errorMessage: null,
      };
    case actionTypes.ACTION_FAILURE:
      return {
        ...state,
        actionProcessing: false,
        errorMessage: action.payload,
      };
    case actionTypes.LOAD_GAMES_LIST_SUCCESS:
      return {
        ...state,
        actionProcessing: false,
        gameList: action.payload.gameList,
        sections: action.payload.sections,
      };
    case actionTypes.LOAD_SESSION_SUCCESS:
      return {
        ...state,
        actionProcessing: false,
        session: action.payload,
      };
    default: return state;
  }
}

export default reducer;