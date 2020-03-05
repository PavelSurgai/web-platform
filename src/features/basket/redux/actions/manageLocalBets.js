import initialState from '../initial';

async function addToLocalStorage(getState) {
  const bets = getState().basket.bets;
  const currentBetslipType = getState().basket.currentBetslipType;

  localStorage.setItem(
    'basket',
    JSON.stringify({ betslipType: currentBetslipType, bets }),
  );
}

async function removeFromLocalStorage(getState, api, bet) {
  const bets = getState().basket.bets;
  const currentBetslipType = getState().basket.currentBetslipType;

  const newBets = bets.filter(b => b.ID !== bet.ID);
  localStorage.setItem(
    'basket',
    JSON.stringify({ betslipType: currentBetslipType, bets: newBets }),
  );
}

async function clearLocalBasket() {
  localStorage.removeItem('basket');
}

async function loadLocalBasket() {
  const basketData = JSON.parse(localStorage.getItem('basket'));
  return basketData ? basketData : initialState;
}

export {
  addToLocalStorage,
  removeFromLocalStorage,
  clearLocalBasket,
  loadLocalBasket,
};
