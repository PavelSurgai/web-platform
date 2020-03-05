const actionTypes = {
  ACTION_PROCESSING: 'fullEvent/ACTION_PROCESSING',
  LOAD_FULL_EVENT_SUCCESS: 'fullEvent/LOAD_FULL_EVENT_SUCCESS',
  LOAD_STATISTIC_SUCCESS: 'fullEvent/LOAD_STATISTIC_SUCCESS',
  CHANGE_VISIBLE_ALL_GROUPS: 'fullEvent/CHANGE_VISIBLE_ALL_GROUPS',
  CHANGE_VISIBLE_GROUP: 'fullEvent/CHANGE_VISIBLE_GROUP',
  ACTION_FAILURE: 'fullEvent/ACTION_FAILURE',
  CLEAR_FULLEVENT: 'fullEvent/CLEAR_FULLEVENT',
  CLEAR_ALL_FULL_EVENTS: 'fullEvent/CLEAR_ALL_FULL_EVENTS',
};

function loadFullEventLine(eventID, lang, mainEventID) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const response = await api.fullEvent.loadFullEventLine(eventID, lang);
    const fullEvent = response.data;

    if (response.success) {
      dispatch({ type: actionTypes.LOAD_FULL_EVENT_SUCCESS, payload: { [fullEvent.ID]: fullEvent } });
    } else dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  };
}

function loadFullEventLive(eventID, lang, mainEventID) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    dispatch({ type: actionTypes.ACTION_PROCESSING, payload: true });
    const response = await api.fullEvent.loadFullEventLive(eventID, lang);
    const fullEvent = response.data;

    if (response.success) {
      dispatch({ type: actionTypes.LOAD_FULL_EVENT_SUCCESS, payload: { [fullEvent.ID]: fullEvent } });
    } else dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  };
}

const saveOpenedCoefGroups = (newEvent, oldEvent) => ({
  ...newEvent,
  coefGroups: newEvent.coefGroups.map(tempNewGroup => {
    const findedOldGroup = oldEvent.coefGroups.find(tempOldGroup => tempOldGroup.ID === tempNewGroup.ID);
    return findedOldGroup === undefined ? tempNewGroup : { ...tempNewGroup, isOpen: findedOldGroup.isOpen };
  }),
});

function updateLiveEvent(eventID, lang) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const previewEvent = getState().fullEvent.events[eventID];
    const response = await api.fullEvent.updateFullEventLive(eventID, lang, previewEvent);
    const fullEvent = saveOpenedCoefGroups(response.data, getState().fullEvent.events[eventID]);
    if (response.success) {
      dispatch({ type: actionTypes.LOAD_FULL_EVENT_SUCCESS, payload: { [fullEvent.ID]: fullEvent } });
    } else dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  };
}

const clearFullEvent = (eventID = -1) => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_FULLEVENT, payload: eventID });
};

const clearAllFullEvents = () => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_ALL_FULL_EVENTS });
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

export {
  actionTypes,
  loadFullEventLine,
  changeVisibleAllGroups,
  changeVisibleGroup,
  loadFullEventLive,
  updateLiveEvent,
  clearFullEvent,
  clearAllFullEvents,
};
