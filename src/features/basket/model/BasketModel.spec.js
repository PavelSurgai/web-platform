import BasketModel from './BasketModel';

describe('BasketModel tests', () => {
  const model = new BasketModel();
  describe('getCorrectedLimits tests', () => {
    const limitsBetroute = {
      1: { min: 20, max: 27 },
      2: { min: 100, max: 150 },
      3: { min: 0, max: 0 },
    };
    const limits = {
      1: { min: 25, max: 30, default: 28 },
      2: { min: 0, max: 0, default: 5 },
      3: { min: 50, max: 150, default: 60 },
    };
    const resultLimits = {
      1: { min: 25, max: 27, default: 28 },
      2: { min: 100, max: 150, default: 5 },
      3: { min: 50, max: 0, default: 60 },
    };

    it('getCorrectedLimits result match resultLimits', () => {
      Object.keys(limitsBetroute).forEach(i => {
        expect(model.getCorrectedLimits(limitsBetroute[i], limits[i])).toEqual(resultLimits[i]);
      });
    });
  });

  describe('getTotalCoef tests', () => {
    const mockBets = {
      1: {
        bets: [
          { rate: { decimal: '1.80' } },
          { rate: { decimal: '1.80' } },
          { rate: { decimal: '1.80' } },
        ],
        result: '5.83',
      },
      2: {
        bets: [
          { rate: { decimal: '399.80' } },
          { rate: { decimal: '42.80' } },
          { rate: { decimal: '50.80' } },
        ],
        result: '1000.00',
      },
    };

    it('getCorrectedLimits result match resultLimits', () => {
      Object.keys(mockBets).forEach(i => {
        expect(model.getTotalCoef(mockBets[i].bets).decimal).toEqual(mockBets[i].result);
      });
    });
  });
});