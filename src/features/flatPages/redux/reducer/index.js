import { actionTypes } from '../actions';
import { initialState } from '../initial';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_FLATPAGES:
      return { ...state, flatPagesList: [...action.payload] };

    default:
      return { ...state };
  }
}