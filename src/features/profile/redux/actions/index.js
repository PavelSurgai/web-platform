import { addNotify } from 'features/notify';

const actionTypes = {
  GET_USERINFO: 'profile/GET_USERINFO',
  USERINFO_LOADING: 'profile/USERINFO_LOADING',
  ACTION_FAILURE: 'profile/ACTION_FAILURE',
  UPDATE_INFO_LOADING: 'profile/UPDATE_USERINFO_LOADING',
  UPDATE_USERINFO: 'profile/UPDATE_USERINFO',
  CHANGE_PASSWORD: 'profile/CHANGE_PASSWORD',
  CHANGE_PASSWORD_LOADING: 'profile/CHANGE_PASSWORD_LOADING',
};

function getUserInfo() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    dispatch({ type: actionTypes.USERINFO_LOADING });
    const response = await api.profile.getUserInfo();
    if (response.success) {
      dispatch({ type: actionTypes.GET_USERINFO, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

function updateUserInfo(info) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    dispatch({ type: actionTypes.UPDATE_INFO_LOADING });
    const response = await api.profile.updateUserInfo(info);
    if (response.success) {
      const message = getState().locale.profile.infoWasUpdated;
      dispatch({ type: actionTypes.UPDATE_USERINFO, payload: response.data });
      dispatch(addNotify(message, 'success'));
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

function changePassword(password, newPassword, repeatNewPassword) {
  return async (dispatch, getState, extra) => {
    const { errorStatusMessage, profile } = getState().locale;
    if (newPassword === repeatNewPassword) {
      dispatch({ type: actionTypes.CHANGE_PASSWORD_LOADING });
      const { api } = extra;
      const response = await api.profile.changePassword(password, newPassword);
      const errorMessage = errorStatusMessage[response.codeStatus] || errorStatusMessage.defaultMessage;
      if (response.success) {
        dispatch({ type: actionTypes.CHANGE_PASSWORD });
        dispatch(addNotify(profile.changedPassword, 'success'));
      } else {
        dispatch({ type: actionTypes.ACTION_FAILURE });
        dispatch(addNotify(errorMessage, 'error'));
      }
    } else {
      dispatch(addNotify(profile.changedPasswordDoNotMatch, 'error'));
    }
  };
}

export {
  getUserInfo,
  actionTypes,
  updateUserInfo,
  changePassword,
};
