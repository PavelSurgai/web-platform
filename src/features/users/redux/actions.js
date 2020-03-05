import { addNotify } from 'features/notify';

const actionTypes = {
  ACTION_PROCESSING: 'user/ACTION_PROCESSING',
  CREATE_USER_SUCCESS: 'user/CREATE_USER_SUCCESS',
  GET_USERS_LIST_SUCCESS: 'user/GET_USER_LIST_SUCCESS',
  RESET_PASSWORD_SUCCESS: 'user/RESET_PASSWORD_SUCCESS',
};

function createUser(userName, password) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const { api } = extra;
    const { locale } = getState().locale;
    const { role } = getState().auth;
    const requestBody = {
      email: userName,
      password,
      name: '',
      currency: 'TND',
    }
    if (role === 2) {
      requestBody.max_withdrawal = 1000000;
      requestBody.max_balance = 1000000;
    };
    const response = await api.user.createUser(requestBody);
    if (response.success) {
      dispatch(addNotify(locale.createSuccess, 'success'))
      dispatch({ type: actionTypes.CREATE_USER_SUCCESS });
    } else {
      dispatch(addNotify('Error', 'error'))
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  };
}

function getUsersList() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { locale } = getState().locale;
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const response = await api.user.getUsersList();
    if (response.success) {
      dispatch({ type: actionTypes.GET_USERS_LIST_SUCCESS, payload: response.data });
    }
    else {
      dispatch(addNotify(locale.networkError, 'error'))
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  };
}

function changeBanState(id, value) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const { api } = extra;
    const { locale } = getState().locale;
    const response = await api.user.changeBanState(id, value);
    const text = value ? locale.banSuccess : locale.unbanSuccess;
    if (response.success) {
      dispatch(addNotify(text, 'success'))
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    } else {
      dispatch(addNotify('Error', 'error'))
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  }
}

function resetPassword(id, callback) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const { api } = extra;
    const { locale } = getState().locale;
    const response = await api.user.resetPassword(id);
    if (response.success) {
      callback(true);
      dispatch(addNotify(locale.resetSuccess, 'success'));
      dispatch({ type: actionTypes.RESET_PASSWORD_SUCCESS, payload: response.data });
    } else {
      dispatch(addNotify('Error', 'error'))
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  }
}

function changeUserBalance(id, amount, isOutcome, callback) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const { api } = extra;
    const { locale } = getState().locale;
    const response = await api.user.changeUserBalance(id, amount, isOutcome);
    if (response.success) {
      dispatch(getUsersList());
      callback('');
      dispatch(addNotify(isOutcome ? locale.withdrawalSuccess : locale.topUpSuccess, 'success'))
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    } else {
      dispatch(addNotify('Error', 'error'))
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  }
}



export {
  actionTypes,
  createUser,
  getUsersList,
  changeBanState,
  resetPassword,
  changeUserBalance,
};