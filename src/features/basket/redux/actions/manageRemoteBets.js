async function addToRemoteBasket(getState, api, bet) {
  const result = await api.basket.addToBetslip(bet);
  return result;
}

async function removeFromRemoteBasket(getState, api, bet) {
  await api.basket.removeFromBetslip(bet);
}

async function clearRemoteBasket(api, lang) {
  await api.basket.clearBetslip(lang);
}

async function loadRemoteBasket(api) {
  const response = await api.basket.loadUserBetslip();
  return response.success ? response.data : [];
}

async function changeTypeToRemoteBasket(api, type) {
  await api.basket.changeBetslipType(type);
}

export {
  addToRemoteBasket,
  removeFromRemoteBasket,
  clearRemoteBasket,
  loadRemoteBasket,
  changeTypeToRemoteBasket,
};
