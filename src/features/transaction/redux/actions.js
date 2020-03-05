import dayjs from 'dayjs';
import { addNotify } from 'features/notify';

const actionTypes = {
  ACTION_PROCESSING: 'user/ACTION_PROCESSING',
  GET_TRANSACTIONS_SUCCESS: 'user/GET_TRANSACTIONS_SUCCESS',
};

function getTransactions(period) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const { api } = extra;
    const newPeriod = {
      startDate: dayjs(period.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(period.endDate).format('YYYY-MM-DD'),
    }
    const response = await api.transaction.getTransactions(newPeriod);
    if (response.success) {
      dispatch({ type: actionTypes.GET_TRANSACTIONS_SUCCESS, payload: response.data });
    } else {
      dispatch(addNotify('Error', 'error'))
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  };
}


export {
  actionTypes,
  getTransactions,
};