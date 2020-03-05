import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_FAILURE:
      return { ...state, actionProcessing: false };

    case actionTypes.ACTION_PROCESSING:
      return { ...state, actionProcessing: action.payload !== undefined ? action.payload : true };

    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        actionProcessing: false,
        isAuth: true,
      };

    case actionTypes.CODE_WAS_SENDED:
      return { ...state, codeWasSended: true };
    
    case actionTypes.GET_BALANCE:
      return { ...state, ...action.payload };

    case actionTypes.LOGOUT:
      return { ...state, isAuth: false };

    case actionTypes.HANDLE_AUTH_MODAL:
      return { ...state, authModal: { isOpen: action.payload.isOpen, isSignIn: action.payload.isSignIn } };
    
    case actionTypes.VERIFY_EMAIL_SUCCESS:
      return { ...state, isVerifying: false };

    case actionTypes.HANDLE_ONECLICK_MODAL:
      return { ...state, oneClickModal: { email: action.payload.email, password: action.payload.password, isOpen: action.payload.isOpen } };
    
    case actionTypes.PASS_CHANGE_SUCCESS:
      return { ...state, handleIsOpen: false, phoneRecovery: false, authModal: { isOpen: false, isSignIn: false } };
    
    case actionTypes.CHANGE_FAILURE:
      return { ...state, handleIsOpen: false, phoneRecovery: false, authModal: { isOpen: false, isSignIn: false } };
    
    case actionTypes.HANDLE_LOGIN_ISPHONE:
      return { ...state, loginIsPhone: action.payload.isPhone, login: action.payload.login };
    
    case actionTypes.START_RECOVERY:
      return { ...state, handleIsOpen: true };
    
    case actionTypes.CLOSE_RECOVERY:
      return { ...state, handleIsOpen: false, phoneRecovery: false };
    
    case actionTypes.PHONE_RECOVERY:
      return { ...state, phoneRecovery: true };
      
    default:
      return { ...state };
  }
}