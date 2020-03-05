import { addNotify } from 'features/notify';

const actionTypes = {
  SIGN_IN_SUCCESS: 'auth/SIGN_IN_SUCCESS',
  LOGOUT: 'auth/LOGOUT',
  GET_BALANCE: 'auth/GET_BALANCE',
}

const login = (username, password) => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { locale } = getState().locale;
  const response = await api.auth.signIn(username, password);
  console.log(response)
  const errorMessage = locale.hasOwnProperty(response.codeStatus) ?
  locale[response.codeStatus] :
  locale.defaultMessage;
  if (response.success) {
    dispatch(checkAuth());
  } else {
    dispatch(addNotify(errorMessage, 'error'));
  }
};

const checkAuth = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { locale } = getState().locale;
  const response = await api.auth.checkAuth();
  if (response.success) {
    if ([1, 2].findIndex(t => t === response.data.role) !== -1) {
      dispatch({ type: actionTypes.SIGN_IN_SUCCESS, payload: response.data });
    } else {
      dispatch(addNotify(locale.notRules, 'error'));
    }
  } else {
    dispatch({ type: actionTypes.LOGOUT });
  }
};

const getBalance = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const response = await api.auth.getBalance();
  if (response.success) {
    dispatch({ type: actionTypes.GET_BALANCE, payload: response.data.balance });
  }
};

const logOut = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const response = await api.auth.logOut();
  dispatch({ type: actionTypes.LOGOUT });
};

export {
  actionTypes,
  login,
  logOut,
  checkAuth,
  getBalance,
}
