import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { MockApi } from 'shared/__mock__/api';
import { payHistory } from 'shared/__mock__/results';

import * as actions from '../redux/actions';
const { actionTypes } = actions;

const api = new MockApi(); // Создаем апи, которое просто возвращает промисы с данными
const mockStore = configureMockStore([thunk.withExtraArgument({ api })]); // Создаем mock стора

describe('Results payHistory actions tests', () => {
  it('getPayHistory action', async () => {
    const lang = 'ru-RU';
    // Создаем стор, при этом прокидываем язык, чтобы action мог его достать
    const store = mockStore({ userSettings: { lang } });

    const expectedActions = [ // массив из экшенов которые задиспатчатся
      {
        type: actionTypes.ACTION_PROCESSING,
      },
      {
        type: actionTypes.GET_PAYHISTORY,
        payload: payHistory,
      },
    ];

    return store.dispatch(actions.getPayHistory()).then(() => { // Выполняем функцию, после отлавливем экшены
      expect(store.getActions()).toEqual(expectedActions);// Сравниваем
    });
  });
});
