const actionTypes = {
  GET_GAME_LIST_SUCCESS: 'outcome/GET_GAME_LIST_SUCCESS',
  ACTION_PROCESSING: 'outcome/ACTION_PROCESSING',
  ACTION_PROCESSING_SUCCESS: 'outcome/ACTION_PROCESSING_SUCCESS',
  ACTION_FAILURE: 'outcome/ACTION_FAILURE',
  LOAD_SESSION: 'outcome/LOAD_SESSION',
};

function getGameList() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { lang } = getState().userSettings.lang;
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const response = await api.outcome.getGameList(lang);
    if (response.success) {
      dispatch({ type: actionTypes.GET_GAME_LIST_SUCCESS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
    }
  };
}

function loadSession(gameId) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { lang } = getState().userSettings.lang;
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const response = await api.outcome.loadSession(lang, gameId);
    if (response.success) {
      dispatch({ type: actionTypes.LOAD_SESSION, payload: response.data });
      dispatch({ type: actionTypes.ACTION_PROCESSING_SUCCESS });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
    }
  };
}

export {
  actionTypes,
  getGameList,
  loadSession,
};
