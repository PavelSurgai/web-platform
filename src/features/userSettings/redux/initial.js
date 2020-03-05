import { languages } from 'shared/locale';
import { oddsTypes } from './data/odds';
import { coefsTypes } from './data/coefsTypes';

export const initialState = {
  lang: languages.EN,
  currencies: [],
  limits: {
    payment: {},
    bonus: {},
    bets: {},
  },
  oddType: oddsTypes.decimal.name,
  coefType: coefsTypes.mainBets.name,
  isSetLangOpen: false,
  isSetOddTypeOpen: false,
  isActiveUseName: false,
};