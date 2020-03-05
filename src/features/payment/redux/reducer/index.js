import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INIT_LOADING:
      return { ...state, initLoading: true };

    case actionTypes.ACTION_FAILURE:
      return { ...state, initLoading: false, withdrawalLoading: false };

    case actionTypes.TOP_UP_SUCCESS:
      return { ...state, initLoading: false };

    case actionTypes.WITHDRAWAL_LOADING:
      return { ...state, withdrawalLoading: true };

    case actionTypes.WITHDRAWAL:
      return { ...state, withdrawalLoading: false };

    case actionTypes.ACCESS_TO_INTERKASSA_VISA_TOPUP_SUCCESS:
      return { ...state, accessToInterkassaVisaTopUp: action.payload };

    default:
      return { ...state };
  }
}