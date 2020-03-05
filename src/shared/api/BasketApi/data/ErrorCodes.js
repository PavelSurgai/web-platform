const ErrorMessage = {
  1: {
    'en-US': 'Bet is not found',
  },
  10: {
    'en-US': 'There is no information about the author of the bet.',
  },
  11: {
    'en-US': 'There is no information on the content of the bid',
  },
  12: {
    'en-US': 'No money on player account',
  },
  13: {
    'en-US': 'Stop reception at the event',
  },
  14: {
    'en-US': 'Stop reception on the option of betting',
  },
  15: {
    'en-US': 'The rate is empty (there are no events on the express or in the system)',
  },
  16: {
    'en-US': 'Express or in the system is not a liquid number of events',
  },
  17: {
    'en-US': 'In the express or system, the same event is used more than once',
  },
  18: {
    'en-US': 'Related events',
  },
  19: {
    'en-US': 'Cash limit exceeded',
  },
  2: {
    'en-US': 'Cash limit exceeded',
  },
  20: {
    'en-US': 'Cash limit exceeded',
  },
  21: {
    'en-US': 'Cash limit exceeded',
  },
  22: {
    'en-US': 'Cash limit exceeded',
  },
  23: {
    'en-US': 'Cash limit exceeded',
  },
  24: {
    'en-US': 'Cash limit exceeded',
  },
  25: {
    'en-US': 'Cash limit exceeded',
  },
  26: {
    'en-US': 'Cash limit exceeded',
  },
  27: {
    'en-US': 'Cash limit exceeded',
  },
  28: {
    'en-US': 'Cash limit exceeded',
  },
  29: {
    'en-US': 'Cash limit exceeded',
  },
  3: {
    'en-US': 'The event has already begun',
  },
  30: {
    'en-US': 'Cash limit exceeded',
  },
  31: {
    'en-US': 'Cash limit exceeded',
  },
  32: {
    'en-US': 'Cash limit exceeded',
  },
  33: {
    'en-US': 'Cash limit exceeded',
  },
  34: {
    'en-US': 'Cash limit exceeded',
  },
  35: {
    'en-US': 'Cash limit exceeded',
  },
  36: {
    'en-US': 'Cash limit exceeded',
  },
  37: {
    'en-US': 'Cash limit exceeded',
  },
  38: {
    'en-US': 'Cash limit exceeded',
  },
  39: {
    'en-US': 'Cash limit exceeded',
  },
  4: {
    'en-US': 'The coefficient has changed',
  },
  40: {
    'en-US': 'Cash limit exceeded',
  },
  41: {
    'en-US': 'Cash limit exceeded',
  },
  42: {
    'en-US': 'Cash limit exceeded',
  },
  43: {
    'en-US': 'Cash limit exceeded',
  },
  44: {
    'en-US': 'Cash limit exceeded',
  },
  45: {
    'en-US': 'Cash limit exceeded',
  },
  46: {
    'en-US': 'Cash limit exceeded',
  },
  47: {
    'en-US': 'Cash limit exceeded',
  },
  48: {
    'en-US': 'Cash limit exceeded',
  },
  49: {
    'en-US': 'User is not found',
  },
  5: {
    'en-US': 'The size of the odds / total has changed',
  },
  50: {
    'en-US': 'Cashier not found',
  },
  51: {
    'en-US': 'Tournament not found',
  },
  52: {
    'en-US': 'No bets',
  },
  53: {
    'en-US': 'Cash limit exceeded',
  },
  54: {
    'en-US': 'Cash limit exceeded',
  },
  55: {
    'en-US': 'Cash limit exceeded',
  },
  56: {
    'en-US': 'Cash limit exceeded',
  },
  57: {
    'en-US': 'Cash limit exceeded',
  },
  58: {
    'en-US': 'Cash limit exceeded',
  },
  59: {
    'en-US': 'Cash limit exceeded',
  },
  6: {
    'en-US': 'Internal error saving bid',
  },
  60: {
    'en-US': 'Cash limit exceeded',
  },
  61: {
    'en-US': 'Cash limit exceeded',
  },
  62: {
    'en-US': 'Cash limit exceeded',
  },
  63: {
    'en-US': 'The event was removed from Live ',
  },
  64: {
    'en-US': 'The event has already begun',
  },
  66: {
    'en-US': 'Parallel reception prohibited',
  },
  67: {
    'en-US': 'Betting is temporarily closed',
  },
  68: {
    'en-US': 'Top express not found',
  },
  69: {
    'en-US': 'Exceeded the maximum amount of payment at the rate',
  },
  7: {
    'en-US': 'Not accepted by the bookie',
  },
  70: {
    'en-US': 'Event only in the express train',
  },
  71: {
    'en-US': 'Event in the ordinary only',
  },
  73: {
    'en-US': 'The bet is available only in triple express',
  },
  74: {
    'en-US': 'The bet is available only in the fourth express',
  },
  75: {
    'en-US': 'The bet is available only in the five-fold express',
  },
  76: {
    'en-US': 'The bet is available only in a six-speed train',
  },
  77: {
    'en-US': 'The bet is available only in the seven-seater',
  },
  78: {
    'en-US': 'The bet is available only in the eight-express',
  },
  79: {
    'en-US': 'The bet is available only on the ninth express train',
  },
  8: {
    'en-US': 'The amount of the bet is less than the minimum',
  },
  9: {
    'en-US': 'Bet amount is more than maximum',
  },
  81: {
    'en-US': 'Re-bid',
  },
  82: {
    'en-US': 'Exceeded the limit on this outcome',
  },
  80: {
    'en-US': 'Exceeded the maximum express rate',
  },
  default: 0,
};

export function getErrorMessage(code, lang = 'en-US') {
  return ErrorMessage[code]
    ? ErrorMessage[code][lang]
    : ErrorMessage.default[lang];
}
