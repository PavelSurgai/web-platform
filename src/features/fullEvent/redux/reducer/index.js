import { actionTypes } from '../actions';
import initialState from '../initial';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return { ...state, actionProcessing: action.payload };

    case actionTypes.LOAD_STATISTIC_SUCCESS:
      return { ...state, statisticList: action.payload };

    case actionTypes.LOAD_FULL_EVENT_SUCCESS:
      return { ...state, events: { ...state.events, ...action.payload }, actionProcessing: false };

    case actionTypes.CHANGE_VISIBLE_ALL_GROUPS: {
      const { visible, eventID } = action.payload;
      const newGroups = state.events[eventID].coefGroups.map(tempGroup => ({
        ...tempGroup,
        betGroups: tempGroup.betGroups.map(tempBetGroup => ({
          ...tempBetGroup,
          isOpen: visible,
        })),
      }));
      const newEvent = { ...state.events[eventID], coefGroups: newGroups };
      return { ...state, events: { ...state.events, [eventID]: newEvent } };
    }

    case actionTypes.CHANGE_VISIBLE_GROUP: {
      const { tempGroup, groupID, visible, eventID } = action.payload;
      const group = state.events[eventID].coefGroups.map(temp => {
        return temp.value === tempGroup ? {
          ...temp,
          betGroups: temp.betGroups.map(tempGroup => {
            return tempGroup.ID === groupID ? { ...tempGroup, isOpen: visible } : tempGroup;
          }),
        } : temp;
      });
      const newEvent = { ...state.events[eventID], coefGroups: group };
      return { ...state, events: { ...state.events, [eventID]: newEvent } };
    }

    case actionTypes.CLEAR_ALL_FULL_EVENTS: {
      return {
        ...state, events: {},
      };
    }

    case actionTypes.CLEAR_FULLEVENT: {
      const newEvents = state.events;
      delete newEvents[action.payload];
      return {
        ...state,
        event: {},
        events: newEvents,
      };
    }

    default:
      return state;
  }
}

export default reducer;
