const basketTypes = {
  SINGLE: {
    ID: 0,
    textID: 'single',
  },
  EXPRESS: {
    ID: 1,
    textID: 'express',
  },
};

const defineType = bets => basketTypes[bets.length < 2 ? 'SINGLE' : 'EXPRESS'];

export { basketTypes, defineType };