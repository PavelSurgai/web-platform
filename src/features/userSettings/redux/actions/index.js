import BaseApi from 'shared/api/BaseApi'; 
import dayjs from 'dayjs';

// импорт локализации dayjs для языков
// import 'dayjs/locale/ru';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/kk';

import { actionTypes as localeActionTypes } from 'features/locale/redux/actions';
import { shortLanguages } from 'shared/locale';

const actionTypes = {
  CHANGE_LANG: 'userSettings/CHANGE_LANG',
  GET_SETTINGS: 'userSettings/GET_SETTINGS',
  SET_ODD_TYPE: 'userSettings/SET_ODD_TYPE',
  CHANGE_SET_LANG_VISIBILITY: 'userSettings/CHANGE_SET_LANG_VISIBILITY',
  CHANGE_SET_ODD_TYPE_VISIBILITY: 'userSettings/CHANGE_SET_ODD_TYPE_VISIBILITY',
  CHANGE_IS_ACTIVE_USE_NAME: 'userSettings/CHANGE_IS_ACTIVE_USE_NAME',
};

const setIsActiveUseNameTolocalStorage = value => async dispatch => {
  localStorage.setItem(
    'isActiveUseName',
    value,
  );
};

const changeIsActiveUseName = value => async dispatch => {
  dispatch({ type: actionTypes.CHANGE_IS_ACTIVE_USE_NAME, payload: value });
  dispatch(setIsActiveUseNameTolocalStorage(value));
};

const getIsActiveUseNameFromLocalStorage = () => async dispatch => {
  const value = localStorage.getItem('isActiveUseName');
  if (typeof value !== 'boolean') {
    dispatch(setIsActiveUseNameTolocalStorage(false));
    dispatch(changeIsActiveUseName(false));
  } else {
    dispatch(changeIsActiveUseName(value));
  }
};

function changeLang(lang) {
  return async dispatch => {
    const { locale } = await import(`shared/locale/${lang}/index`); // code-spliting для словарей
    document.querySelector('html').lang = shortLanguages[lang];
    dayjs.locale(shortLanguages[lang]);
    dispatch(setLanguage(lang));
    dispatch({ type: actionTypes.CHANGE_LANG, payload: lang });
    dispatch({ type: localeActionTypes.CHANGE_LOCALE, payload: locale });
    BaseApi.setLang(lang);
  };
}

function setLanguage(lang) {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    await api.settings.setGlobalLanguage(lang);
  };
}

function getSettings() {
  return async (dispatch, getState, extra) => {
    const { api } = extra;
    const response = await api.settings.getSettings();
    if (response.success) {
      dispatch({ type: actionTypes.GET_SETTINGS, payload: response.data });
    }
  };
}

function setOddType(oddType) {
  return async dispatch => {
    dispatch({ type: actionTypes.SET_ODD_TYPE, payload: oddType });
  };
}

function changeSetLangVisibility() {
  return async dispatch => dispatch({ type: actionTypes.CHANGE_SET_LANG_VISIBILITY });
}

function changeSetOddTypeVisibility() {
  return async dispatch => dispatch({ type: actionTypes.CHANGE_SET_ODD_TYPE_VISIBILITY });
}

export {
  actionTypes,
  changeLang,
  getSettings,
  setOddType,
  changeSetLangVisibility,
  changeSetOddTypeVisibility,
  changeIsActiveUseName,
  getIsActiveUseNameFromLocalStorage,
};
