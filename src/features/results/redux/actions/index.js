import { addNotify } from 'features/notify';

const actionTypes = {
  GET_SPORTS: 'results/GET_SPORTS',
  GET_TOURNAMENTS: 'results/GET_TOURNAMENTS',
  GET_RESULTS: 'results/GET_RESULTS',
  ACTION_PROCESSING: 'results/ACTION_PROCESSING',
  ACTION_FAILURE: 'results/ACTION_FAILURE',
};

function getSports(info) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const { lang } = getState().userSettings;

    const response = await api.results.getSports(info, lang);
    if (response.success) {
      dispatch({ type: actionTypes.GET_SPORTS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

function getTournaments(info) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const { lang } = getState().userSettings;
    const response = await api.results.getTournaments(info, lang);
    if (response.success) {
      dispatch({ type: actionTypes.GET_TOURNAMENTS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

function getResults(info) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCESSING });
    const { api } = extra;
    const { lang } = getState().userSettings;
    
    const response = await api.results.getResults(info, lang);
    if (response.success) {
      dispatch({ type: actionTypes.GET_RESULTS, payload: response.data });
    } else {
      dispatch({ type: actionTypes.ACTION_FAILURE });
      dispatch(addNotify(response.errorMessage, 'error'));
    }
  };
}

export {
  actionTypes,
  getSports,
  getTournaments,
  getResults,
};