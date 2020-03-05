import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LANG:
      return {
        ...state,
        lang: action.payload,
      };

    case actionTypes.CHANGE_IS_ACTIVE_USE_NAME:
      return {
        ...state,
        isActiveUseName: action.payload,
      }

    case actionTypes.GET_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };

    case actionTypes.SET_ODD_TYPE:
      return {
        ...state,
        oddType: action.payload,
      };

    case actionTypes.CHANGE_SET_LANG_VISIBILITY: {
      return {
        ...state,
        isSetLangOpen: !state.isSetLangOpen,
      };
    }

    case actionTypes.CHANGE_SET_ODD_TYPE_VISIBILITY: {
      return {
        ...state,
        isSetOddTypeOpen: !state.isSetOddTypeOpen,
      };
    }

    default:
      return { ...state };
  }
}