import { addNotify } from 'features/notify';
import { shortLanguages } from 'shared/locale';

export const actionTypes = {
  GET_FLATPAGES: 'flatPages/GET_FLATPAGES',
};

export function getFlatPages() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { lang } = getState().userSettings;
    const response = await api.flatPages.getFlatPages(shortLanguages[lang]);
    if (response.success) {
      dispatch({ type: actionTypes.GET_FLATPAGES, payload: response.data });
    } else {
      // dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}