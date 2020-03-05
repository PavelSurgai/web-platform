import { actionTypes } from './actions';
import { initialState } from './initial';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return {
        ...state,
        actionProcessing: action.payload,
      };
    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        actionProcessing: false,
      };

    case actionTypes.GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        usersList: action.payload,
        actionProcessing: false,
      }

    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        actionProcessing: false,
        newPassword: action.payload,
      }

    default:
      return { ...state };
  }
}