import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { MockApi } from 'shared/__mock__/api';
import { getSportsData } from 'shared/__mock__/results';

import * as actions from '../redux/actions';
const { actionTypes } = actions;

const api = new MockApi(); // Создаем апи, которое просто возвращает промисы с данными
const mockStore = configureMockStore([thunk.withExtraArgument({ api })]); // Создаем mock стора

describe('Results feature actions tests', () => {
  it('getSports action', async () => {
    const lang = 'ru-RU';
    // Создаем стор, при этом прокидываем язык, чтобы action мог его достать
    const store = mockStore({ userSettings: { lang } });

    const expectedActions = [ // массив из экшенов которые задиспатчаться
      {
        type: actionTypes.ACTION_PROCESSING,
      },
      {
        type: actionTypes.GET_SPORTS,
        payload: getSportsData,
      },
    ];

    return store.dispatch(actions.getSports()).then(() => { // Выполняем функцию, после отлавливем экшены
      expect(store.getActions()).toEqual(expectedActions);// Сравниваем
    });
  });

  it('getTournaments action', () => {
    const lang = 'ru-RU';

    const store = mockStore({ userSettings: { lang } });

    const expectedActions = [
      {
        type: actionTypes.ACTION_PROCESSING,
      },
      {
        type: actionTypes.GET_TOURNAMENTS,
        payload: getSportsData,
      },
    ];

    return store.dispatch(actions.getTournaments()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('getResults action', () => {
    const lang = 'ru-RU';

    const store = mockStore({ userSettings: { lang } });

    const expectedActions = [
      {
        type: actionTypes.ACTION_PROCESSING,
      },
      {
        type: actionTypes.GET_RESULTS,
        payload: getSportsData,
      },
    ];

    return store.dispatch(actions.getResults()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
