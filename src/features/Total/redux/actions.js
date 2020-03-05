import { addNotify } from 'features/notify';

const actionTypes = {
  ACTION_PROCESSING: 'total/ACTION_PROCESSING',
  GET_TOTAL_SUCCESS: 'total/GET_TOTAL_SUCCESS',
}

const getTotal = (fromDare, toDate) => async (dispatch, getState, extra) => {
  const { api } = extra;
  dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
  const response = await api.total.getTotal(fromDare, toDate);
  if (response.success) {
    dispatch({ type: actionTypes.GET_TOTAL_SUCCESS, payload: response.data });
  } else {
    dispatch(addNotify('Error', 'error'));
  }
};

export {
  actionTypes,
  getTotal,
}
