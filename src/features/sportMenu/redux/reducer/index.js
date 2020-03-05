import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return { ...state, sportsLoading: true };

    case actionTypes.ACTION_PROCESSING_COUNRIES:
      return { ...state, countriesLoading: true, collapsedID: action.payload };

    case actionTypes.ACTION_FAILURE:
      return { ...state, sportsLoading: false, countriesLoading: false };

    case actionTypes.GET_SPORTS:
      return {
        ...state,
        sports: action.payload,
        sportsLoading: false,
      };

    case actionTypes.CLEAR_COUNTRIES:
      return {
        ...state,
        countries: [],
      };

    case actionTypes.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesLoading: false,
      };

    case actionTypes.CHANGE_FILTER_VALUE:
      return {
        ...state,
        filterValue: action.payload,
      };

    default:
      return { ...state };
  }
}
