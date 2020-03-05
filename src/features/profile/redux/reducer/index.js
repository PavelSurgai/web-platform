import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USERINFO_LOADING:
      return { ...state, userInfoLoading: true };

    case actionTypes.ACTION_FAILURE:
      return { ...state, userInfoLoading: false, updateInfoLoading: false, changePasswordLoading: false };

    case actionTypes.GET_USERINFO:
      return { ...state, user: { ...action.payload }, userInfoLoading: false };

    case actionTypes.UPDATE_INFO_LOADING:
      return { ...state, updateInfoLoading: true };

    case actionTypes.UPDATE_USERINFO:
      return { ...state, updateInfoLoading: false, user: { ...state.user, ...action.payload } };

    case actionTypes.CHANGE_PASSWORD_LOADING:
      return { ...state, changePasswordLoading: true };

    case actionTypes.CHANGE_PASSWORD:
      return { ...state, changePasswordLoading: false };

    default:
      return { ...state };
  }
}