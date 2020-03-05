import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { addNotify } from 'features/notify';

dayjs.extend(customParseFormat);

const actionTypes = {
  ACTION_PROCCESSING: 'line/ACTION_PROCCESSING',
  LOAD_LINE_TOURNEYS_SUCCESS: 'line/LOAD_LINE_SUCCESS',
  CHANGE_OPENED_TOURNEY: 'line/CHANGE_OPENED_TOURNEY',
  LOAD_LINE_EVENTS_SUCCESS: 'line/LOAD_LINE_EVENTS_SUCCESS',
  LOAD_TOP_EVENTS_SUCCESS: 'line/LOAD_TOP_EVENTS_SUCCESS',
  CHANGE_OPENED_TOP_TOURNEY: 'line/CHANGE_OPENED_TOP_TOURNEY',
  LOAD_VAFORITES_LIST_SUCCESS: 'line/LOAD_VAFORITES_LIST_SUCCESS',
  LOAD_UPCOMING_EVENTS_SUCCESS: 'line/LOAD_UPCOMING_EVENTS_SUCCESS',
  LOAD_UPCOMING_SUCCESS: 'line/LOAD_UPCOMING_SUCCESS',
  CLEAR_LOCAL_FAVORITES: 'line/CLEAR_LOCAL_FAVORITES',
  LOAD_FAVORITE_EVENT_SUCCESS: 'line/LOAD_FAVORITE_EVENT_SUCCESS',
  CLEAR_LOCAL_FAVORITES_EVENTS: 'line/CLEAR_LOCAL_FAVORITES_EVENTS',
  CLEAR_UPCOMING_EVENTS: 'line/CLEAR_UPCOMING_EVENTS',
  CLEAR_DATA: 'line/ CLEAR_DATA',
  CHANGE_OPENED_UPCOMING_TOURNEY: 'line/CHANGE_OPENED_UPCOMING_TOURNEY',
  CHANGE_FAVORITES_TOURNEY: 'line/CHANGE_FAVORITES_TOURNEY',
  CLEAR_LOCAL_FAVORITES_TOURNEYS: 'line/CLEAR_LOCAL_FAVORITES_TOURNEYS',
  CHANGE_OPENED_FAVORITES_TOURNEY: 'line/CHANGE_OPENED_FAVORITES_TOURNEY',
  CHANGE_OPENED_SPORT: 'line/CHANGE_OPENED_SPORT',
  CHANGE_OPENED_LINE_TOURNEYS: 'line/CHANGE_OPENED_LINE_TOURNEYS',
};

const loadLineTourneys = (sportID, countryID, lang, filterTime = 0, isMobile = false) => {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
    const response = await api.line.loadLineTourneys(sportID, countryID, lang, filterTime);

    if (response.success) {
      dispatch({ type: actionTypes.LOAD_LINE_TOURNEYS_SUCCESS, payload: response.data });
      response.data.map(tempTourney => dispatch(loadEventsByTourney(sportID, countryID, tempTourney.ID, lang, filterTime, isMobile)));
    } else dispatch({ type: actionTypes.ACTION_FAILURE, payload: response.errorMessage });
  };
};

const changeOpenedAllLineTourneys = isOpen => async dispatch => {
  dispatch({ type: actionTypes.CHANGE_OPENED_LINE_TOURNEYS, payload: !isOpen });
};

const loadUpcomingTourneys = (sportID, countryID, duration) => async (dispatch, getState, extra) => {
  dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
  const { api } = extra;
  const { lang } = getState().userSettings;
  const { line } = getState().locale;

  const response = await api.line.loadUpcomingTourneys(sportID, countryID, duration * 60, lang);

  if (response.success) dispatch({ type: actionTypes.LOAD_UPCOMING_SUCCESS, payload: response.data });
  else dispatch(addNotify(line.loadingError, 'error'));
};

const loadEventsByTourney = (sportID, countryID, tourneyID, lang, filterTime = 0, isMobile = false) => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
    const { api } = extra;
    const response = await api.line.loadEventsByTourney({ sportID, countryID, tourneyID, filterTime }, lang);
    if (response.data.length) {
      dispatch({ type: actionTypes.LOAD_LINE_EVENTS_SUCCESS, payload: { events: response.data, tourneyID, isMobile } });
    }
  };
};

const changeOpenedSport = sportID => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.CHANGE_OPENED_SPORT, payload: sportID });
  };
};

const loadUpcomingEventsByTourney = (sportID, countryID, tourneyID, lang, duration) => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
    const { api } = extra;
    const filterTime = duration * 60;
    const response = await api.line.loadEventsByTourney({ sportID, countryID, tourneyID, filterTime }, lang);
    response.data.length &&
      dispatch({ type: actionTypes.LOAD_UPCOMING_EVENTS_SUCCESS, payload: { events: response.data, tourneyID } });
  };
};

const clearLocalFavoritesTourneys = () => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_LOCAL_FAVORITES_TOURNEYS });
};

const clearLocalFavoritesEvents = () => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_LOCAL_FAVORITES_EVENTS });
};

const loadFavoritesEvents = () => async (dispatch, getState, extra) => {
  dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
  const { favoritesList } = getState().line;
  dispatch(clearLocalFavoritesEvents());
  dispatch(clearLocalFavoritesTourneys());
  favoritesList && favoritesList.forEach((event) => dispatch(_loadFavoritEvent(event)));
  dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: false });
};

const _convertEventToTourney = event => {
  const favoriteTourney = {
    ID: event.tourneyID,
    tourneyName: event.tourneyName,
    sportID: event.sportID,
    sportName: event.sportName,
    countryID: event.countryID,
    isOpen: true,
    events: [event],
  };
  return favoriteTourney;
};

const formatTourney = favoritesEvent => async (dispatch, getState, extra) => {
  let { favoritesTourneys } = getState().line;
  if (favoritesTourneys.length > 0) {
    let hasTourney = false;
    favoritesTourneys.forEach(tourney => {
      if (tourney.ID === favoritesEvent.tourneyID) {
        tourney.events = [...tourney.events, favoritesEvent];
        hasTourney = true;
      }
    });
    favoritesTourneys = [...favoritesTourneys];
    if (!hasTourney) {
      const favoriteTourney = _convertEventToTourney(favoritesEvent);
      favoritesTourneys = [...favoritesTourneys, favoriteTourney];
    }
  } else {
    const favoriteTourney = _convertEventToTourney(favoritesEvent);
    favoritesTourneys = [...favoritesTourneys, favoriteTourney];
  }
  dispatch({ type: actionTypes.CHANGE_FAVORITES_TOURNEY, payload: favoritesTourneys });
};

const _loadFavoritEvent = ({ data, ID }) => async (dispatch, getState, extra) => {
  const { lang } = getState().userSettings;
  const { api } = extra;
  const response = await api.line.loadFullEvent(data.ID, lang);
  if (!response.data) {
    const delResponse = await api.line.delFavorite(ID);
    dispatch({ type: actionTypes.LOAD_VAFORITES_LIST_SUCCESS, payload: delResponse.data });
  }
  if (response.data && response.success) {
    dispatch({ type: actionTypes.LOAD_FAVORITE_EVENT_SUCCESS, payload: response.data });
    dispatch(formatTourney(response.data));
  }
};

const loadFavoritesList = () => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { lang } = getState().userSettings;
  const response = await api.line.getFavorites(lang);
  if (response.success) {
    dispatch({ type: actionTypes.LOAD_VAFORITES_LIST_SUCCESS, payload: response.data });
  }
};

const clearLocalFavoritesList = () => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_LOCAL_FAVORITES });
};

const clearUpcomingEvents = () => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_UPCOMING_EVENTS });
};

const clearData = () => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_DATA });
};

const addFavoritEvent = event => async (dispatch, getState, extra) => {
  const { api } = extra;
  const { isAuth } = getState().auth;
  const { auth } = getState().locale;
  const { lang } = getState().userSettings;
  const { favoritesList } = getState().line;
  const convertedDate = dayjs(event.eventDate, 'DD.MM.YYYY HH:mm').toISOString();
  if (isAuth) {
    const removeFavorite = favoritesList.find(temp => temp.data.ID === event.ID);
    if (removeFavorite === undefined) {
      const response = await api.line.addFavorit(convertedDate, event.ID, event.teams, 3, lang);
      dispatch({ type: actionTypes.LOAD_VAFORITES_LIST_SUCCESS, payload: response.data });
    } else {
      const response = await api.line.delFavorite(removeFavorite.ID);
      dispatch({ type: actionTypes.LOAD_VAFORITES_LIST_SUCCESS, payload: response.data });
    }
  } else dispatch(addNotify(auth.needAuth, 'error'));
};

const loadTopEvents = () => {
  return async (dispatch, getState, extra) => {
    dispatch({ type: actionTypes.ACTION_PROCCESSING, payload: true });
    const { api } = extra;
    const { lang } = getState().userSettings;
    const response = await api.line.loadTopEvents(lang);
    dispatch({ type: actionTypes.LOAD_TOP_EVENTS_SUCCESS, payload: response.data });
  };
};

const changeOpenedTourney = tourneyID => async dispatch => {
  dispatch({ type: actionTypes.CHANGE_OPENED_TOURNEY, payload: tourneyID });
};

const changeOpenedTopTourney = tourneyID => async dispatch => {
  dispatch({ type: actionTypes.CHANGE_OPENED_TOP_TOURNEY, payload: tourneyID });
};

const changeOpenedFavoritesTourney = tourneyID => async dispatch => {
  dispatch({ type: actionTypes.CHANGE_OPENED_FAVORITES_TOURNEY, payload: tourneyID });
};

const changeOpenedUpcomingTourney = tourneyID => async dispatch => {
  dispatch({ type: actionTypes.CHANGE_OPENED_UPCOMING_TOURNEY, payload: tourneyID });
};

export {
  actionTypes,
  loadLineTourneys,
  loadEventsByTourney,
  changeOpenedTourney,
  loadTopEvents,
  changeOpenedTopTourney,
  loadFavoritesList,
  addFavoritEvent,
  clearLocalFavoritesList,
  loadFavoritesEvents,
  clearLocalFavoritesEvents,
  clearData,
  loadUpcomingTourneys,
  clearUpcomingEvents,
  changeOpenedUpcomingTourney,
  loadUpcomingEventsByTourney,
  changeOpenedFavoritesTourney,
  changeOpenedSport,
  changeOpenedAllLineTourneys,
};
