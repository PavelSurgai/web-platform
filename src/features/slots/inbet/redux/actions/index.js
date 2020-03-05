const actionTypes = {
  ACTION_PROCESSING: 'inbet/ACTION_PROCESSING',
  ACTION_FAILURE: 'inbet/ACTION_FAILURE',
  LOAD_GAMES_LIST_SUCCESS: 'inbet/LOAD_GAMES_LIST_SUCCESS',
  LOAD_SESSION_SUCCESS: 'inbet/LOAD_SESSION_SUCCESS',
  LOAD_SETTINGS_SUCCESS: 'inbet/LOAD_SETTINGS_SUCCESS',
};

const getGamesList = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const response = await api.inbet.getGameList();
  if (response.success) {
    dispatch({ type: actionTypes.LOAD_GAMES_LIST_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  }
};

const loadSession = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const response = await api.inbet.loadSession();
  if (response.success) {
    dispatch({ type: actionTypes.LOAD_SESSION_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  }
};

export {
  actionTypes,
  getGamesList,
  loadSession,
};
