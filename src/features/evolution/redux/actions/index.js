const actionTypes = {
  ACTION_PROCESSING: 'evolution/ACTION_PROCESSING',
  ACTION_FAILURE: 'evolution/ACTION_FAILURE',
  LOAD_GAMES_LIST_SUCCESS: 'evolution/LOAD_GAMES_LIST_SUCCESS',
  LOAD_GAME_SUCCESS: 'evolution/LOAD_GAME_SUCCESS',
};

const getGameList = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  dispatch({ type: actionTypes.ACTION_PROCESSING });
  const response = await api.evolution.getGameList();
  if (response.success) {
    dispatch({ type: actionTypes.LOAD_GAMES_LIST_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  }
};

const runGame = pageCode => async (dispatch, getState, extra) => {
  const { api } = extra;
  dispatch({ type: actionTypes.ACTION_PROCESSING });
  const data = {
    page_code: pageCode,
  };
  const response = await api.evolution.runGame(data);
  if (response.success) {
    dispatch({ type: actionTypes.LOAD_GAME_SUCCESS, payload: response.data });
  } else {
    dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  }
};

export {
  actionTypes,
  getGameList,
  runGame,
};
