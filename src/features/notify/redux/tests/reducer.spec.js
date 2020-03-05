import { reducer } from '../reducer';
import { actionTypes } from '../actions';
import { initialState } from '../initial';

describe('Notify reducer tests', () => {
  describe(actionTypes.ADD_NOTIFY, () => {
    it('ADD_NOTIFY to initialState', () => {
      const payload = {
        text: 'Test',
        type: 'default',
        id: 123,
      };
  
      const action = {
        type: actionTypes.ADD_NOTIFY,
        payload,
      };
  
      expect(reducer(initialState, action)).toEqual({ ...initialState, notifications: [payload] });
    });

    it('ADD_NOTIFY with existing notifications', () => {
      const existingNotifycations = [1, 2, 3];
      const newNotifycation = 34;

      const state = { ...initialState, notifications: existingNotifycations };

      const action = {
        type: actionTypes.ADD_NOTIFY,
        payload: newNotifycation,
      };
  
      expect(reducer(state, action))
        .toEqual({ ...state, notifications: [...existingNotifycations, newNotifycation] });
    });
  });

  describe(actionTypes.DELETE_NOTIFY, () => {
    it('DELETE_NOTIFY', () => {
      const notifications = [
        { text: 'Test 1', id: 1 },
        { text: 'Test 2', id: 2 },
        { text: 'Test 3', id: 3 },
      ];

      const state = { ...initialState, notifications };

      const deleteId = 3;

      const action = { type: actionTypes.DELETE_NOTIFY, payload: deleteId };

      expect(reducer(state, action)).toEqual({
        ...state,
        notifications: [notifications[0], notifications[1]],
      });
    });
  });
});