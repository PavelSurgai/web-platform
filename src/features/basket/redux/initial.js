import { basketTypes } from '../data/basketTypes';

const initialState = {
  actionProcessing: false,
  bets: [],
  tempBets: [],
  basketType: basketTypes.SINGLE,
  limits: {
    min: 1,
    max: 10000,
  },
  isOneClick: false,
  amountOneClick: 50,
  basketProcessing: false,
  modalBasketIsOpen: false,
};
export default initialState;
