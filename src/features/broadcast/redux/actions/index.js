const actionTypes = {
  ACTION_PROCESSING: 'broadcast/ACTION_PROCESSING',
  ACTION_FAILURE: 'broadcast/ACTION_PROCESSING',
  GET_MATCHLIST: 'broadcast/GET_MATCHLIST',
};

function getMatchList() {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const response = await api.broadcast.getMatchList();
    if (response.success) {
      dispatch({ type: actionTypes.GET_MATCHLIST, payload: response.data });
    }
  };
}

export {
  actionTypes,
  getMatchList,
};