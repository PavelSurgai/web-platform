const actionTypes = {
  GET_TOKEN: 'betgames/GET_TOKEN',
  ACTION_FAILURE: 'betgames/ACTION_FAILURE',
  ACTION_PROCESSING: 'betgames/ACTION_PROCESSING',
};

function getToken() {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const response = await api.betgames.getUserToken();
    if (response.success) {
      dispatch({ type: actionTypes.GET_TOKEN, payload: response.data.token });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
    }
  };
}

export {
  getToken,
  actionTypes,
};
