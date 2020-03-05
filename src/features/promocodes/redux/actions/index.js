import { addNotify } from 'features/notify';

const actionTypes = {
  ACTION_PROCESSING: 'wjfront/promocode/ACTION_PROCESSING',
  ACTION_ENDED: 'wjfront/promocode/ACTION_ENDED',
};

const activatePromocode = promocode => async (dispatch, getState, extra) => {
  dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
  const locale = getState().locale.promocode;
  const { api } = extra;
  const response = await api.promocode.activatePromocode(promocode);
  if (response.success) {
    const notify = `${locale.promocode} ${promocode} ${locale.succes}`;
    dispatch(addNotify(notify, 'success'));
  } else {
    const notify = `${locale.promocode} ${promocode} ${locale.notFinded}`;
    dispatch(addNotify(notify, 'error'));
  }
  dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
};

export {
  actionTypes,
  activatePromocode,
};
