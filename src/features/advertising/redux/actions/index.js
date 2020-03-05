const actionTypes = {
  LOAD_ADVERTISING_SUCCESS: 'advertising/LOAD_ADVERTISING_SUCCESS',
};

const loadAdvertising = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { lang } = getState().userSettings;
  const response = await api.media.loadAdvertising(lang);
  if (response.success) dispatch({ type: actionTypes.LOAD_ADVERTISING_SUCCESS, payload: response.data });
};

export {
  actionTypes,
  loadAdvertising,
};