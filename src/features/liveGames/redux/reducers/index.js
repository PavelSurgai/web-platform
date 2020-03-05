import initialState from '../initial';
import { actionTypes } from '../actions';

function reducer(state = initialState, action) {
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
    
    case actionTypes.GET_EZUGI_TOKEN_SUCСESS:
      return {
        ...state,
        token: action.payload.token,
        operatorId: action.payload.operatorId,
        actionProcessing: false,
      };

    case actionTypes.GET_EZUGI_GAME_SUCСESS:
      return {
        ...state,
        gameUrl: action.payload,
        actionProcessing: false,
      };

    default:
      return { ...state };
  }
}

export default reducer;
