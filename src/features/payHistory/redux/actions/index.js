import dayjs from 'dayjs';
import { addNotify } from 'features/notify';

const actionTypes = {
  ACTION_FAILURE: 'payHistory/ACTION_FAILURE',
  ACTION_PROCESSING: 'payHistory/ACTION_PROCESSING',
  GET_PAYHISTORY: 'payHistory/GET_PAYHISTORY',
};

function getPayHistory() {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;

    const dateBegin = dayjs().add(-1, 'month').format('YYYY-MM-DD');
    const dateEnd = dayjs().format('YYYY-MM-DD');
    const timePeriod = {
      begin: dateBegin,
      end: dateEnd,
    };

    const response = await api.payment.getPayHistory(timePeriod);
    if (response.success) {
      dispatch({ type: actionTypes.GET_PAYHISTORY, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      addNotify(response.errorMessage, 'error');
    }
  };
}

export {
  actionTypes,
  getPayHistory,
};