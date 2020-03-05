import { actionTypes } from '../actions';
import initialState from '../initial';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCCESSING: {
      return {
        ...state,
        actionProcessing: action.payload,
      };
    }
    
    case actionTypes.LOAD_DOWNLOAD_URL_SUCCESS: {
      return {
        ...state,
        downloadUrl: action.payload,
        actionProcessing: false,
      };
    }

    default:
      return state;
  }
}

export default reducer;
