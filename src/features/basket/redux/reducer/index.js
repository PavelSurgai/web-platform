import initialState from '../initial';
import { actionTypes } from '../actions';

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_TO_BASKET:
      return {
        ...state,
        bets: [...state.bets, action.payload],
      };

    case actionTypes.REMOVE_FROM_BASKET: {
      const indexToRemove = state.bets.findIndex(bet => bet.ID === action.payload.ID);
      const newBets = state.bets;
      newBets.splice(indexToRemove, 1);
      return { ...state, bets: [...newBets] };
    }

    case actionTypes.CHANGE_BETSLIP_TYPE:
      return {
        ...state,
        basketType: action.payload,
      };

    case actionTypes.CLEAR_BASKET:
      return { ...state, bets: [] };

    case actionTypes.CHANGE_IS_ONE_CLICK:
      return { ...state, isOneClick: action.payload };

    case actionTypes.CHANGE_AMOUNT_ONE_CLICK:
      return { ...state, amountOneClick: action.payload };

    case actionTypes.SET_BET_AMOUNT: {
      const newBets = state.bets.map(bet => {
        return bet.ID === action.payload.betID ? {
          ...bet.betInfo,
          betAmount: action.payload.amount,
        } : bet;
      });

      return { ...state, newBets };
    }

    case actionTypes.SET_COMMON_BET_AMOUNT: {
      const bets = state.bets.map(bet => ({ ...bet, betInfo: { ...bet.betInfo, betAmount: action.payload } }));
      return { ...state, bets };
    }

    case actionTypes.LOAD_USER_BETSLIP:
      return {
        ...state,
        bets: action.payload.bets,
        basketProcessing: false,
      };

    case actionTypes.ADD_TEMP_BETS:
      return {
        ...state,
        tempBets: action.payload,
        actionProcessing: true,
      };
    
    case actionTypes.RETURN_TEMP_BETS:
      return {
        ...state,
        bets: action.payload,
        tempBets: [],
        actionProcessing: false,
        basketProcessing: false,
      };
    
    case actionTypes.BASKET_PROCESSING:
      return {
        ...state,
        basketProcessing: true,
        actionSuccess: false,
        errorMessage: null,
      };

    case actionTypes.BASKET_SUCCESS:
      return {
        ...state,
        actionSuccess: true,
        basketProcessing: false,
        // modalBasketIsOpen: false,
      };
    
    case actionTypes.CHANGE_OPEN_BASKET_MODAL:
      return {
        ...state,
        modalBasketIsOpen: action.payload,
      };
    
    case actionTypes.ADD_ERROR_BETS:
      const errorBets = state.bets.map(bet => {
        const errorInfo = action.payload.find(el => el.id === bet.betslipInfo.eId);
        return {
          ...bet,
          errorCode: errorInfo.errorCode,
        };
      });
      return {
        ...state,
        bets: errorBets,
        basketProcessing: false,
      };
    
    case actionTypes.CHANGE_BASKET_PROCESSING:
      return {
        ...state,
        basketProcessing: action.payload,
      };

    case actionTypes.BASKET_FAILURE:
      return {
        ...state,
        actionSuccess: false,
        basketProcessing: false,
        errorMessage: action.payload,
      };

    case actionTypes.GET_LIMITATIONS:
      return { ...state, limits: action.payload };

    default: return state;
  }
}

export default reducer;
