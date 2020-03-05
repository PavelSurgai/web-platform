import { addNotify } from 'features/notify';

const actionTypes = {
  ACTION_PROCESSING: 'toto/ACTION_PROCESSING',
  ACTION_FAILURE: 'toto/ACTION_FAILURE',
  LOAD_TOTO_EVENTS_SUCCESS: 'toto/ACTION_FAILURE',
  LOAD_FULL_EVENTS_SUCCESS: 'toto/LOAD_FULL_EVENT_SUCCESS',
  SET_TOTO_INFO: 'toto/SET_TOTO_INFO',
  LOAD_USER_TICKETS_SUCCESS: 'toto/LOAD_USER_TICKETS_SUCCESS',
  HIDE_TICKET: 'toto/HIDE_TICKET',
};

function loadToto() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage } = getState().locale;
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const response = await api.toto.loadToto();
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch({ type: actionTypes.LOAD_FULL_EVENTS_SUCCESS, payload: response.data });
    } else {
      dispatch(addNotify(errorMessage, 'error'));
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  };
}

function loadTickets() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { errorStatusMessage } = getState().locale;
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const response = await api.toto.loadTickets();
    const errorMessage = errorStatusMessage.hasOwnProperty(response.codeStatus) ?
      errorStatusMessage[response.codeStatus] :
      errorStatusMessage.defaultMessage;
    if (response.success) {
      dispatch({ type: actionTypes.LOAD_USER_TICKETS_SUCCESS, payload: response.data });
    } else {
      dispatch(addNotify(errorMessage, 'error'));
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  };
}

function hideTotoTicket(ID, isOpen) {
  return async (dispatch, getState, extra) => dispatch({ type: actionTypes.HIDE_TICKET, payload: { ID, isOpen } });
}

function makeTotoBet(bets, amount) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { totoID } = getState().toto.totoList;
    const locale = getState().locale.basket;
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const response = await api.toto.makeTotoBet(totoID, bets, amount);
    if (response.success) {
      dispatch(addNotify(locale.betSuccess, 'success'));
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    } else {
      dispatch(addNotify(response.errorMessage, 'error'));
      dispatch({ type: actionTypes.ACTION_PROCESSING, payload: false });
    }
  };
}

export {
  loadToto,
  makeTotoBet,
  loadTickets,
  actionTypes,
  hideTotoTicket,
};