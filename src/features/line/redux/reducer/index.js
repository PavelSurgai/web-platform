import { actionTypes } from '../actions';
import initialState from '../initial';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_LINE_TOURNEYS_SUCCESS: {
      return {
        ...state,
        lineTourneys: action.payload,
      };
    }
    
    case actionTypes.LOAD_LINE_EVENTS_SUCCESS: {
      const tourneys = state.lineTourneys;
      const newTourneys = tourneys.map(temp => {
        return temp.ID === action.payload.tourneyID ?
          {
            ...temp,
            events: action.payload.events,
            isOpen: !action.payload.isMobile,
          } : temp;
      });
      return {
        ...state,
        lineTourneys: newTourneys,
      };
    }

    case actionTypes.LOAD_UPCOMING_EVENTS_SUCCESS: {
      const tourneys = state.upcomingTourneys;
      const newTourneys = tourneys.map(temp => {
        return temp.ID === action.payload.tourneyID ? { ...temp, events: action.payload.events, isOpen: true } : temp;
      });
      return {
        ...state,
        upcomingTourneys: newTourneys,
      };
    }

    case actionTypes.LOAD_TOP_EVENTS_SUCCESS: {
      return {
        ...state,
        topTourneys: action.payload,
      };
    }

    case actionTypes.CHANGE_OPENED_TOURNEY: {
      const tourneys = state.lineTourneys;
      const findedTourney = tourneys.find(temp => temp.ID === action.payload);
      const newTourneys = tourneys.map(temp => {
        return temp.ID === action.payload ? { ...temp, isOpen: !findedTourney.isOpen } : temp;
      });
      return {
        ...state,
        lineTourneys: newTourneys,
      };
    }
    

    case actionTypes.CHANGE_OPENED_SPORT: {
      const newTourneys = state.topTourneys.map(tempSport => tempSport.ID === action.payload ? { ...tempSport, isOpen: !tempSport.isOpen } : tempSport);
      return {
        ...state,
        topTourneys: newTourneys,
      };
    }

    case actionTypes.CHANGE_OPENED_TOP_TOURNEY: {
      const newTopTourneys = state.topTourneys.map(tempSport => ({
        ...tempSport,
        tourneys: tempSport.tourneys.map(tempTourney => ({
          ...tempTourney,
          isOpen: tempTourney.ID === action.payload ? !tempTourney.isOpen : tempTourney.isOpen,
        })),
      }));
      return {
        ...state,
        topTourneys: newTopTourneys,
      };
    }

    case actionTypes.CHANGE_OPENED_UPCOMING_TOURNEY: {
      const newTourneys = state.upcomingTourneys.map(tempTourney => {
        return tempTourney.ID === action.payload ? { ...tempTourney, isOpen: !tempTourney.isOpen } : tempTourney;
      });
      return {
        ...state,
        upcomingTourneys: newTourneys,
      };
    }

    case actionTypes.CHANGE_OPENED_LINE_TOURNEYS: {
      const newTourneys = state.lineTourneys.map(tempTourney => (
        { ...tempTourney, isOpen: action.payload }
      ));
      return {
        ...state,
        lineTourneys: newTourneys,
      };
    }

    case actionTypes.LOAD_VAFORITES_LIST_SUCCESS: {
      return {
        ...state,
        favoritesList: action.payload,
      };
    }

    case actionTypes.CLEAR_LOCAL_FAVORITES: {
      return {
        ...state,
        favoritesList: [],
      };
    }

    case actionTypes.CLEAR_DATA: {
      return {
        ...state,
        lineTourneys: [],
      };
    }

    case actionTypes.LOAD_FAVORITE_EVENT_SUCCESS: {
      const { favoritesEvents } = state;
      return {
        ...state,
        favoritesEvents: [...favoritesEvents, action.payload],
      };
    }

    case actionTypes.LOAD_UPCOMING_SUCCESS:
      return {
        ...state,
        upcomingTourneys: action.payload,
      };


    case actionTypes.CLEAR_LOCAL_FAVORITES_EVENTS: {
      return {
        ...state,
        favoritesEvents: [],
      };
    }

    case actionTypes.CLEAR_UPCOMING_EVENTS: {
      return {
        ...state,
        upcomingTourneys: [],
      };
    }

    case actionTypes.CHANGE_FAVORITES_TOURNEY: {
      return {
        ...state,
        favoritesTourneys: action.payload,
      };
    }

    case actionTypes.CLEAR_LOCAL_FAVORITES_TOURNEYS: {
      return {
        ...state,
        favoritesTourneys: [],
      };
    }

    case actionTypes.CHANGE_OPENED_FAVORITES_TOURNEY: {
      const changedFavoritesTourneys = state.favoritesTourneys
        .map(tourney => tourney.ID === action.payload ? { ...tourney, isOpen: !tourney.isOpen } : tourney);
      return {
        ...state,
        favoritesTourneys: changedFavoritesTourneys,
      };
    }

    default:
      return state;
  }
}

export default reducer;
