import { addNotify } from 'features/notify';

const actionTypes = {
  SIGN_IN_SUCCESS: 'auth/SIGN_IN_SUCCESS',
  SIGN_UP_SUCCESS: 'auth/SIGN_UP_SUCCESS',
  VERIFY_EMAIL_SUCCESS: 'auth/VERIFY_EMAIL_SUCCESS',
  LOG_OUT: 'auth/LOG_OUT',
  ACTION_FAILURE: 'auth/ACTION_FAILURE',
  ACTION_PROCESSING: 'auth/ACTION_PROCESSING',
  GET_BALANCE: 'auth/GET_BALANCE',
  LOGOUT: 'auth/LOGOUT',
  HANDLE_AUTH_MODAL: 'auth/HANDLE_AUTH_MODAL',
  HANDLE_ONECLICK_MODAL: 'auth/HANDLE_ONECLICK_MODAL',
  PASS_CHANGE_SUCCESS: 'auth/PASS_CHANGE_SUCCESS',
  PASS_CHANGE_FAILURE: 'auth/PASS_CHANGE_FAILURE',
  HANDLE_LOGIN_ISPHONE: 'auth/HANDLE_LOGIN_ISPHONE',
  START_RECOVERY: 'auth/START_RECOVERY',
  CLOSE_RECOVERY: 'auth/CLOSE_RECOVERY',
  PHONE_RECOVERY: 'auth/PHONE_RECOVERY',
  COPIED_AUTH_INFO: 'auth/COPIED_AUTH_INFO',
  CODE_WAS_SENDED: 'auth/CODE_WAS_SENDED',
};

function signInUniversal(login, password, callback) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage, auth } = getState().locale;
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const formattedLogin = login.replace('+', '');
    const response = await api.auth.loginUniversal(formattedLogin, password);
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch(checkAuth());
      dispatch(handleAuthModal(false));
      dispatch(addNotify(auth.successAuth, 'success'));
      if (callback) callback();
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(errorMessage, 'error'));
    }
  };
}

function signInByPhone(phone, password, callback) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage, auth } = getState().locale;
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const response = await api.auth.signInByPhone(phone, password);
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch(checkAuth());
      dispatch(handleAuthModal(false));
      dispatch(addNotify(auth.successAuth, 'success'));
      callback && callback();
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(errorMessage, 'error'));
    }
  };
}

function handleAuthModal(isOpen, isSignIn = true) {
  return async dispatch => dispatch({ type: actionTypes.HANDLE_AUTH_MODAL, payload: { isOpen, isSignIn } });
}

function emailVerifycation(code) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage, auth } = getState().locale;
    const response = await api.auth.verifyEmail(code);
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch(addNotify(auth.successAuth, 'success'));
    } else {
      dispatch(addNotify(errorMessage, 'error'));
    }
  };
}
function handleOneclickModal(email, password, isOpen) {
  return async dispatch => dispatch({ type: actionTypes.HANDLE_ONECLICK_MODAL, payload: { email, password, isOpen } });
}

function startRecovery() {
  return async dispatch => dispatch({ type: actionTypes.START_RECOVERY });
} 

function closeRecovery() {
  return async dispatch => dispatch({ type: actionTypes.CLOSE_RECOVERY });
}

const sendPhoneCode = login => {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage } = getState().locale;
    const responce = await api.auth.getPhoneCode(login);
    const errorMessage = errorStatusMessage.hasOwnProperty(responce.codeStatus) ?
      errorStatusMessage[responce.codeStatus] : localStorage.auth.recoveryFailed;
    if (responce.success) {
      dispatch({ type: actionTypes.PHONE_RECOVERY });
    } else {
      dispatch({ type: actionTypes.PHONE_RECOVERY });
      dispatch(addNotify(errorMessage, 'error'));
    }
  };
};


function handleLogin(login, callBack) {
  return async (dispatch, getState, extra) => {
    const isPhone = login.indexOf('@') === -1 && login.indexOf('.') === -1;
    const { errorStatusMessage, auth } = getState().locale;
    const { api } = extra;
    const responce = isPhone ? await api.auth.getPhoneCode(login) : await api.auth.sendEmail(login);
    const errorMessage = errorStatusMessage.hasOwnProperty(responce.codeStatus) ?
      errorStatusMessage[responce.codeStatus] : auth.tryAgain;
    if (responce.success) {
      if (isPhone) {
        dispatch(addNotify(auth.checkPhone, 'success'));
        if (callBack) callBack();
      } else {
        dispatch(addNotify(auth.checkEmail, 'success'));
        dispatch({ type: actionTypes.PASS_CHANGE_SUCCESS });
      }
    } else {
      dispatch(addNotify(errorMessage, 'error'));
      dispatch({ type: actionTypes.PASS_CHANGE_SUCCESS });
    }
  };
}

function signInByEmail(email, password, callback) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage, auth } = getState().locale;
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const response = await api.auth.signInByEmail(email, password);
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch(checkAuth());
      dispatch(handleAuthModal(false));
      dispatch(addNotify(auth.successAuth, 'success'));
      callback && callback();
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(errorMessage, 'error'));
    }
  };
}

function checkAuth(callback) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const response = await api.auth.checkAuth();
    if (response.success) {
      dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.LOGOUT });
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(handleAuthModal(true, false));
      if (callback) callback();
    }
  };
}

function getBalance() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const response = await api.auth.getBalance();
    if (response.success) {
      dispatch({ type: actionTypes.GET_BALANCE, payload: response.data });
    }
  };
}

function logOut() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const response = await api.auth.logOut();
    dispatch({ type: actionTypes.LOGOUT });
  };
}

function sendToPhoneCode(phone, callBack) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage } = getState().locale;
    const response = await api.auth.sendToPhoneCode(phone);
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      if (callBack) callBack();
    } else {
      dispatch(addNotify(errorMessage, 'error'));
    }
  };
}

function signUpByEmail(info, callback) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const { lang } = getState().userSettings;
    const { errorStatusMessage, auth } = getState().locale;
    const response = await api.auth.signUp({ ...info, lang });
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch(addNotify(auth.pleaseCheckAuth, 'success'));
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
      if (callback) callback();
    } else {
      dispatch(addNotify(errorMessage, 'error'));
      dispatch({ type: actionTypes.ACTION_FAILURE });
    }
  };
}

function signUpOneClick(currency, callback) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const { lang } = getState().userSettings;
    const { errorStatusMessage } = getState().locale;

    const getMinimum = () => Math.random() > 0.5 ? 65 : 97;

    const letters =
    String.fromCharCode((Math.random() * 25) + getMinimum()) +
    String.fromCharCode((Math.random() * 25) + getMinimum()) +
    String.fromCharCode((Math.random() * 25) + getMinimum());

    const email = `${Math.trunc(Math.random() * 1000)}${letters}@pitch90bet.com`;
    const password = `${Math.trunc(Math.random() * 1000000)}`;


    const response = await api.auth.signUp({ email, currency, password, lang, need_activation: false });
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch(handleOneclickModal(email, password, true));
      dispatch(signInByEmail(email, password, callback));
      dispatch(handleAuthModal(false));
    } else {
      dispatch(addNotify(errorMessage, 'error'));
      dispatch({ type: actionTypes.ACTION_FAILURE });
    }
  };
}

const copiedAuthInfo = () => async (dispatch, getState) =>
  dispatch(addNotify(getState().locale.auth.copiedSuccess, 'success'));

function signUpPhone(phone, currency, password, code, callback) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const { lang } = getState().userSettings;
    const { errorStatusMessage } = getState().locale;

    const response = await api.auth.signUpPhone({ phone, currency, password, code, lang });
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch(signInByPhone(phone, password, callback));
    } else {
      dispatch(addNotify(errorMessage, 'error'));
      dispatch({ type: actionTypes.ACTION_FAILURE });
    }
  };
}

const sendNewPasswordByEmail = (pass, location, callBack) => {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage } = getState().locale;
    const code = location.search.slice(location.search.indexOf('=') + 1);
    const { recoverySuccess, recoveryFailed } = getState().locale.auth;
    const responce = await api.auth.changePassword(pass, code);
    const errorMessage = errorStatusMessage.hasOwnProperty(responce.codeStatus) ?
      errorStatusMessage[responce.codeStatus] : recoveryFailed;
    if (responce.success) {
      dispatch(addNotify(recoverySuccess, 'success'));
      dispatch({ type: actionTypes.PASS_CHANGE_SUCCESS });
      callBack();
    } else {
      dispatch(addNotify(errorMessage, 'error'));
    }
  };
};
const sendNewPasswordByPhone = (login, pass, phoneCode) => {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage } = getState().locale;
    const responce = await api.auth.changePasswordByPhone(login, pass, phoneCode);
    const { recoverySuccess, recoveryFailed } = getState().locale.auth;
    const errorMessage = errorStatusMessage.hasOwnProperty(responce.codeStatus) ?
      errorStatusMessage[responce.codeStatus] : recoveryFailed;
    if (responce.success) {
      dispatch({ type: actionTypes.PASS_CHANGE_SUCCESS });
      dispatch(addNotify(recoverySuccess, 'success'));
    } else {
      dispatch(addNotify(errorMessage, 'error'));
      dispatch({ type: actionTypes.PASS_CHANGE_FAILURE });
    }
  };
};


export {
  actionTypes,
  startRecovery,
  closeRecovery,
  handleLogin,
  sendPhoneCode,
  signInUniversal,
  signInByPhone,
  signInByEmail,
  emailVerifycation,
  checkAuth,
  getBalance,
  logOut,
  sendToPhoneCode,
  signUpByEmail,
  handleAuthModal,
  handleOneclickModal,
  signUpOneClick,
  signUpPhone,
  sendNewPasswordByEmail,
  sendNewPasswordByPhone,
  copiedAuthInfo,
};
