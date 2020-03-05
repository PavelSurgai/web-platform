import { actionTypes } from '../actions';
import { initialState } from '../initial';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTION_PROCESSING:
      return { ...state, actionProcessing: true };

    case actionTypes.ACTION_FAILURE:
      return { ...state, actionProcessing: false };

    case actionTypes.LOAD_FULL_EVENTS_SUCCESS:
      return { ...state, totoList: action.payload };
    
    case actionTypes.SET_TOTO_INFO:
      return { ...state, totoID: action.payload.id };

    case actionTypes.LOAD_USER_TICKETS_SUCCESS:
      return { ...state, userTickets: action.payload };

    case actionTypes.HIDE_TICKET:
      const tickets = state.userTickets.map(item => {
        return item.ticketID === action.payload.ID ? {
          ...item, isOpen: !action.payload.isOpen,
        } : item;
      });
      const userTickets = [...tickets]
      return { ...state, userTickets };


    default:
      return { ...state };
  }
}