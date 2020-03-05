const actionTypes = {
  ACTION_PROCESSING: 'liveGames/ACTION_PROCESSING',
  ACTION_FAILURE: 'liveGames/ACTION_FAILURE',
  GET_EZUGI_TOKEN_SUCСESS: 'liveGames/GET_EZUGI_TOKEN_SUCСESS',
  GET_EZUGI_GAME_SUCСESS: 'liveGames/GET_EZUGI_GAME_SUCСESS',
};

function getEzugiToken() {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const response = await api.liveGames.getEzugiToken();
    if (response.success) {
      dispatch({ type: actionTypes.GET_EZUGI_TOKEN_SUCСESS, payload: response.data });
    } else { 
      dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
    }
  };
}

function getEzugiGame(game) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const { token, operatorId } = getState().liveGames;
    const { lang } = getState().userSettings;
    const response = await api.liveGames.getEzugiGame(token, operatorId, lang, game);
    if (response.success) {
      dispatch({ type: actionTypes.GET_EZUGI_GAME_SUCСESS, payload: response.data });
    } else { 
      dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
    }
  };
}

export {
  actionTypes,
  getEzugiToken,
  getEzugiGame,
};
