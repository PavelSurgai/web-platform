const actionTypes = {
  ACTION_PROCCESSING: 'downloadApp/ACTION_PROCCESSING',
  LOAD_DOWNLOAD_URL_SUCCESS: 'downloadApp/LOAD_DOWNLOAD_URL_SUCCESS',
};

const getDownloadUrl = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
  const response = await api.downloadApp.getDownloadUrl();
  if (response.success) {
    dispatch({ type: actionTypes.LOAD_DOWNLOAD_URL_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: false });
  }
};

export {
  actionTypes,
  getDownloadUrl,
};
