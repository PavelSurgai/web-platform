import { addNotify } from 'features/notify';
import { shortLanguages } from 'shared/locale';

const actionTypes = {
  GET_SPORTS: 'sportMenu/GET_SPORTS',
  ACTION_PROCESSING: 'sportMenu/ACTION_PROCESSING',
  ACTION_FAILURE: 'sportMenu/ACTION_FAILURE',
  GET_COUNTRIES: 'sportMenu/GET_COUNTRIES',
  ACTION_PROCESSING_COUNRIES: 'sportMenu/ACTION_PROCESSING_COUNRIES',
  CLEAR_COUNTRIES: 'sportMenu/CLEAR_COUNTRIES',
  CHANGE_FILTER_VALUE: 'sportMenu/CHANGE_FILTER_VALUE',
};

function getSports() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { lang } = getState().userSettings;
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const response = await api.sportMenu.getSports(lang);
    if (response.success) {
      dispatch({ type: actionTypes.GET_SPORTS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify('Line error', 'error'));
    }
  };
}

function collapseSport(id) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { lang } = getState().userSettings;
    const collapsedID = getState().sportMenu.collapsedID === id ? null : id;
    dispatch({ type: actionTypes.ACTION_PROCESSING_COUNRIES, payload: collapsedID });
    const response = await api.sportMenu.getCountries(id, lang);
    if (response.success) {
      dispatch({ type: actionTypes.CLEAR_COUNTRIES });
      dispatch({ type: actionTypes.GET_COUNTRIES, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify('Line error', 'error'));
    }
  };
}

function getCountries(sportID, time) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING_COUNRIES });
    dispatch({ type: actionTypes.CLEAR_COUNTRIES });
    const { api } = extra;
    const { lang } = getState().userSettings;
    const response = await api.sportMenu.getCountries(sportID, lang, time);
    if (response.success) {
      dispatch({ type: actionTypes.GET_COUNTRIES, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify('Line error', 'error'));
    }
  };
}

const changeFilterValue = newValue => async dispatch =>
  dispatch({ type: actionTypes.CHANGE_FILTER_VALUE, payload: newValue });

export {
  actionTypes,
  getSports,
  getCountries,
  collapseSport,
  changeFilterValue,
};
