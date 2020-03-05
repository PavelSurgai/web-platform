const actionTypes = {
  ACTION_PROCCESSING: 'live/ACTION_PROCCESSING',
  LOAD_LIVE_SUCCESS: 'live/LOAD_LIVE_SUCCESS',
  CHANGE_OPENED_TOURNEY: 'live/CHANGE_OPENED_TOURNEY',
  CHANGE_OPENED_SPORT: 'live/CHANGE_OPENED_SPORT',
  LOAD_LINE_EVENTS_SUCCESS: 'live/LOAD_LINE_EVENTS_SUCCESS',
  LOAD_TOP_EVENTS_SUCCESS: 'live/LOAD_TOP_EVENTS_SUCCESS',
  ACTION_FAILURE: 'live/ACTION_FAILURE',
  ADD_TO_MULTI_LIVE: 'live/ADD_TO_MULTI_LIVE',
  UPDATE_LIVE_SUCCESS: 'live/UPDATE_LIVE_SUCCESS',
  UPDATE_MULTI_LIVE_SUCCESS: 'live/UPDATE_MULTI_LIVE_SUCCESS',
  CHANGE_VISIBLE_ALL_GROUPS: 'live/CHANGE_VISIBLE_ALL_GROUPS',
  CHANGE_VISIBLE_GROUP: 'live/CHANGE_VISIBLE_GROUP',
  REMOVE_EVENT: 'live/REMOVE_EVENT',
  CHANGE_ACTIVE_LIVE_SPORT: 'live/CHANGE_ACTIVE_LIVE_SPORT',
  CHANGE_OPENED_SPORT_TOURNEYS: 'live/CHANGE_OPENED_SPORT_TOURNEYS',
};

const loadLive = () => {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { lang } = getState().userSettings;
    dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
    const response = await api.live.loadLive(lang);

    if (response.success) {
      dispatch({ type: actionTypes.LOAD_LIVE_SUCCESS, payload: response.data });
    } else dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  };
};

const addToMultiLive = eventID => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { multiLiveEvents } = getState().live;
  const { lang } = getState().userSettings;
  if (multiLiveEvents.findIndex(temp => temp.ID === eventID) === -1) {
    const response = await api.fullEvent.loadFullEventLive(eventID, lang);
    if (response.success) dispatch({ type: actionTypes.ADD_TO_MULTI_LIVE, payload: response.data });
  }
};

const changeOpenedSport = sportID => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.CHANGE_OPENED_SPORT, payload: sportID });
  };
};

const changeOpenedSportTourneys = sportID => async dispatch =>
  dispatch({ type: actionTypes.CHANGE_OPENED_SPORT_TOURNEYS, payload: sportID });

const changeOpenedTourney = tourneyID => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.CHANGE_OPENED_TOURNEY, payload: tourneyID });
  };
};

const updateLive = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { lang } = getState().userSettings;
  const getCurrentEvents = () => getState().live.sports;
  const response = await api.live.updateLive(lang, getCurrentEvents);
  if (response.data.length && !response.data[0].tourneyName) {
    dispatch({ type: actionTypes.UPDATE_LIVE_SUCCESS, payload: response.data });
  }
};

const updateMultiLive = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { lang } = getState().userSettings;
  const getCurrentEvents = () => getState().live.sports;
  const getCurrentMulti = () => getState().live.multiLiveEvents;
  const response = await api.live.updateMultiLive(lang, getCurrentEvents, getCurrentMulti);
  if (response.success) {
    dispatch({ type: actionTypes.UPDATE_MULTI_LIVE_SUCCESS, payload: response.data });
  }
};

function changeVisibleAllGroups(visible, eventID) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.CHANGE_VISIBLE_ALL_GROUPS, payload: { visible, eventID } });
  };
}

function changeVisibleGroup(groupID, visible, tempGroup, eventID) {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.CHANGE_VISIBLE_GROUP, payload: { groupID, visible, tempGroup, eventID } });
  };
}

const removeEvent = eventID => async (dispatch, getState, extra) => {
  dispatch({ type: actionTypes.REMOVE_EVENT, payload: eventID });
};

function changeActiveLiveSport(id) {
  return async dispatch => {
    dispatch({ type: actionTypes.CHANGE_ACTIVE_LIVE_SPORT, payload: id });
  };
}

export {
  actionTypes,
  loadLive,
  changeOpenedSport,
  changeOpenedTourney,
  addToMultiLive,
  updateLive,
  updateMultiLive,
  changeVisibleAllGroups,
  changeVisibleGroup,
  changeActiveLiveSport,
  removeEvent,
  changeOpenedSportTourneys,
};