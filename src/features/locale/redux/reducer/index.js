import { actionTypes } from '../actions';
import { initialState } from '../initial';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LANG:
      return {
        ...action.payload,
      };

    default:
      return { ...state };
  }
}