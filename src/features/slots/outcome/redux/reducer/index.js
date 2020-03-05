import { actionTypes } from '../actions';
import initialState from '../initial';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        actionProcessing: false,
      };

    case actionTypes.ACTION_PROCESSING:
      return {
        ...state,
        actionProcessing: true,
      };

    case actionTypes.ACTION_PROCESSING_SUCCESS:
      return {
        ...state,
        actionProcessing: true,
      };

    case actionTypes.GET_GAME_LIST_SUCCESS:
      const { gameList, sections } = action.payload;
      return {
        ...state,
        gameList,
        sections,
        actionProcessing: false,
      };

    case actionTypes.LOAD_SESSION:
      const { sessionId, sessionUrl } = action.payload;
      return {
        ...state,
        sessionId,
        sessionUrl,
      };

    default:
      return { ...state };
  }
}

export default reducer;
