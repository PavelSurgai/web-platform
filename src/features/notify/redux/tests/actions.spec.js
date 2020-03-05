import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { MockApi } from 'shared/__mock__/api';

import * as actions from '../actions';

const { actionTypes } = actions;

const api = new MockApi();
const mockStore = configureMockStore([thunk.withExtraArgument({ api })]);

describe('Notify actions tests', () => {
  it('addNotify action tests', () => {
    const mockedDate = new Date(2019, 10, 10);
    const store = mockStore();
    global.Date = jest.fn(() => mockedDate);

    const notify = {
      text: 'Test text',
      type: 'success',
    };
    
    const expectedAction = {
      type: actionTypes.ADD_NOTIFY,
      payload: { ...notify, needClose: true, id: new Date().toISOString() },
    };

    return store.dispatch(actions.addNotify(notify.text, notify.type))
      .then(() => expect(store.getActions()).toEqual([expectedAction]));
  });

  it('deleteNotify action tests', () => {
    const store = mockStore();

    const deleteId = 123;

    const expectedAction = {
      type: actionTypes.DELETE_NOTIFY,
      payload: deleteId,
    };

    return store.dispatch(actions.deleteNotify(deleteId))
      .then(() => expect(store.getActions()).toEqual([expectedAction]));
  });
});