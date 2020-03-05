import { initialState } from './initial';
import { actionTypes } from './actions';

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return { ...initialState };
    case actionTypes.SIGN_IN_SUCCESS:
      return { ...state, isAuth: true, name: action.payload.login, currency: action.payload.currency, role: action.payload.role }
    case actionTypes.GET_BALANCE: 
      return { ...state, balance: action.payload }
    default: return { ...state };
  }
}