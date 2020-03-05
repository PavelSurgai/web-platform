import { actionTypes } from '../actions';
import initialState from '../initial';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_ACTIVE_LIVE_SPORT:
      return {
        ...state,
        activeSport: action.payload,
      };

    case actionTypes.LOAD_LIVE_SUCCESS: {
      return {
        ...state,
        sports: action.payload,
      };
    }

    case actionTypes.ADD_TO_MULTI_LIVE: {
      const oldMultiLiveEvents = state.multiLiveEvents;
      return {
        ...state,
        multiLiveEvents: [...oldMultiLiveEvents, action.payload],
      };
    }

    case actionTypes.REMOVE_EVENT: {
      const newMultiLiveEvents = state.multiLiveEvents.filter(temp => temp.ID !== action.payload);
      return {
        ...state,
        multiLiveEvents: newMultiLiveEvents,
      };
    }

    case actionTypes.UPDATE_LIVE_SUCCESS: {
      return {
        ...state,
        sports: action.payload,
      };
    }

    case actionTypes.UPDATE_MULTI_LIVE_SUCCESS: {
      return {
        ...state,
        sports: action.payload.sports,
        multiLiveEvents: action.payload.multiEvents,
      };
    }

    case actionTypes.CHANGE_OPENED_SPORT: {
      const newSports = state.sports.map(tempSport => tempSport.ID === action.payload ? { ...tempSport, isOpen: !tempSport.isOpen } : tempSport);
      return {
        ...state,
        sports: newSports,
      };
    }

    case actionTypes.CHANGE_OPENED_TOURNEY: {
      const newSports = state.sports.map(tempSport => ({
        ...tempSport,
        tourneys: tempSport.tourneys.map(tempTourney => ({
          ...tempTourney,
          isOpen: tempTourney.ID === action.payload ? !tempTourney.isOpen : tempTourney.isOpen,
        })),
      }));
      return {
        ...state,
        sports: newSports,
      };
    }

    case actionTypes.CHANGE_OPENED_SPORT_TOURNEYS:
      const newSports = state.sports.map(tempSport => ({
        ...tempSport,
        tourneys: tempSport.ID === action.payload ? tempSport.tourneys.map(tempTourney => ({
          ...tempTourney,
          isOpen: !tempTourney.isOpen,
        })) : tempSport.tourneys,
      }));
      return {
        ...state,
        sports: newSports,
      };

    case actionTypes.CHANGE_VISIBLE_ALL_GROUPS: {
      const newMultiLiveEvents = state.multiLiveEvents.map(tempEvent => {
        if (tempEvent.ID === action.payload.eventID) {
          const newGroups = tempEvent.coefGroups.map(tempGroup => ({
            ...tempGroup,
            betGroups: tempGroup.betGroups.map(tempBetGroup => ({
              ...tempBetGroup,
              isOpen: action.payload.visible,
            })),
          }));
          const newEvent = { ...tempEvent, coefGroups: newGroups };
          return newEvent;
        } return tempEvent;
      });

      return { ...state, multiLiveEvents: newMultiLiveEvents };
    }

    case actionTypes.CHANGE_VISIBLE_GROUP: {
      const newMultiLiveEvents = state.multiLiveEvents.map(tempEvent => {
        if (tempEvent.ID === action.payload.eventID) {
          const group = tempEvent.coefGroups.map(temp => {
            return temp.value === action.payload.tempGroup ? {
              ...temp,
              betGroups: temp.betGroups.map(tempGroup => {
                return tempGroup.ID === action.payload.groupID ? { ...tempGroup, isOpen: action.payload.visible } : tempGroup;
              }),
            } : temp;
          });
          const newEvent = { ...tempEvent, coefGroups: group };
          return newEvent;
        } return tempEvent;
      });
      return { ...state, multiLiveEvents: newMultiLiveEvents };
    }

    default:
      return state;
  }
}

export default reducer;
