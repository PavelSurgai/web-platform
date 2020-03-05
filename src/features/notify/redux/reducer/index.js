import { initialState } from '../initial';
import { actionTypes } from '../actions';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_NOTIFY:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case actionTypes.DELETE_NOTIFY:
      const indexById = state.notifications.findIndex(x => x.id === action.payload);
      const notifications = [
        ...state.notifications.slice(0, indexById),
        ...state.notifications.slice(indexById + 1),
      ];
      return {
        ...state,
        notifications,
      };

    default:
      return { ...state };
  }
}