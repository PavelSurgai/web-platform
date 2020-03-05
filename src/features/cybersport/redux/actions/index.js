import { addNotify } from 'features/notify';
const actionTypes = {
  ACTION_PROCCESSING: 'cyber/ACTION_PROCCESSING',
  LOAD_GAMES_SUCCESS: 'cyber/LOAD_GAMES_SUCCESS',
  CHANGE_OPENED_TOURNEY: 'cyber/CHANGE_OPENED_TOURNEY',
  LOAD_CYBER_TOURNEYS_SUCCESS: 'cyber/LOAD_CYBER_TOURNEYS_SUCCESS',
  CHANGE_OPENED_GAME: 'cyber/CHANGE_OPENED_GAME',
  LOAD_CYBER_EVENTS_SUCCESS: 'cyber/LOAD_CYBER_EVENTS_SUCCESS',
  CHANGE_OPENED_ALL_TOURNEYS: 'cyber/CHANGE_OPENED_ALL_TOURNEYS',
  CHANGE_ACTIVE_GAME_ID: 'cyber/CHANGE_ACTIVE_GAME_ID',
};

const loadCybersportGames = () => {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const { lang } = getState().userSettings;
    dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
    const response = await api.cybersport.loadCybersportGames(lang);

    if (response.success && response.data.length) {
      dispatch({ type: actionTypes.LOAD_GAMES_SUCCESS, payload: response.data });
      response.data.forEach(temp => {
        dispatch(loadLineTourneys(temp.ID));
      });
    }
  };
};

const loadLineTourneys = countryID => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { lang } = getState().userSettings;
  dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
  const response = await api.line.loadLineTourneys(300, countryID, lang);

  if (response.success) {
    dispatch({ type: actionTypes.LOAD_CYBER_TOURNEYS_SUCCESS, payload: { tourneys: response.data, tourneyID: countryID } });
  }
};

const loadEventsByTourney = (sportID, countryID, tourneyID) => async (dispatch, getState, extra) => {
  dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
  const { api } = extra;
  const { lang } = getState().userSettings;
  const response = await api.line.loadEventsByTourney({ sportID, countryID, tourneyID }, lang);
  if (response.data.length) {
    dispatch({ type: actionTypes.LOAD_CYBER_EVENTS_SUCCESS, payload: { events: response.data, tourneyID, gameID: countryID } });
  }
};

const changeOpenedSport = sportID => async (dispatch, getState, extra) => {
  dispatch({ type: actionTypes.CHANGE_OPENED_GAME, payload: sportID });
};


const changeOpenedTourney = tourneyID => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.CHANGE_OPENED_TOURNEY, payload: tourneyID });
  };
};

const changeActiveGameID = gameID =>
  async dispatch => dispatch({ type: actionTypes.CHANGE_ACTIVE_GAME_ID, payload: gameID });

export {
  actionTypes,
  loadLineTourneys,
  loadEventsByTourney,
  changeOpenedSport,
  changeOpenedTourney,
  loadCybersportGames,
  changeActiveGameID,
};