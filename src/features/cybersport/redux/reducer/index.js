import { actionTypes } from '../actions';
import initialState from '../initial';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_GAMES_SUCCESS: {
      return {
        ...state,
        games: action.payload,
      };
    }
    
    case actionTypes.LOAD_CYBER_EVENTS_SUCCESS: {
      const newGames = state.games.map(tempGame => tempGame.ID !== action.payload.gameID ?
        tempGame :
        { ...tempGame,
          tourneys: tempGame.tourneys.map(tempTourney => tempTourney.ID !== action.payload.tourneyID ?
            tempTourney :
            { ...tempTourney, events: action.payload.events, isOpen: true }) });
      return {
        ...state,
        games: newGames,
      };
    }

    case actionTypes.LOAD_CYBER_TOURNEYS_SUCCESS: {
      const newGames = state.games.map(temp => temp.ID === action.payload.tourneyID ? { ...temp, tourneys: action.payload.tourneys } : temp)
      return {
        ...state,
        games: newGames,
      };
    }

    case actionTypes.CHANGE_OPENED_GAME: {
      const newGames = state.games.map(tempSport => tempSport.ID === action.payload ? { ...tempSport, isOpen: !tempSport.isOpen } : tempSport);
      return {
        ...state,
        games: newGames,
      };
    }

    case actionTypes.CHANGE_OPENED_TOURNEY: {
      const newGames = state.games.map(tempSport => ({
        ...tempSport,
        tourneys: tempSport.tourneys.map(tempTourney => ({
          ...tempTourney,
          isOpen: tempTourney.ID === action.payload ? !tempTourney.isOpen : tempTourney.isOpen,
        })),
      }));
      return {
        ...state,
        games: newGames,
      };
    }

    case actionTypes.CHANGE_OPENED_TOP_TOURNEY: {
      const newTourneys = state.topTourneys.map(tempTourney => {
        return tempTourney.ID === action.payload ? { ...tempTourney, isOpen: !tempTourney.isOpen } : tempTourney;
      });
      return {
        ...state,
        topTourneys: newTourneys,
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

    case actionTypes.CHANGE_ACTIVE_GAME_ID:
      return { ...state, activeGameID: action.payload };

    default:
      return state;
  }
}

export default reducer;
