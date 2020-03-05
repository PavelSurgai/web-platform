import convertOddToCurrentType, { convertOddToAmerican, convertOddToFractional } from './OddsTypeModel';

describe('OddsTypeModel tests', () => {
  const coefs = [
    { decimal: '2.26', fractional: '63/50', american: '+ 126' },
    { decimal: '1.80', fractional: '4/5', american: '- 125' },
    { decimal: '1.34', fractional: '17/50', american: '- 294' },
    { decimal: '1.16', fractional: '4/25', american: '- 625' },
  ];

  it('convertOddToAmerican tests', () => {
    coefs.forEach(coef => {
      expect(convertOddToAmerican(coef.decimal)).toEqual(coef.american);
    });
  });

  it('convertOddToFractional tests', () => {
    coefs.forEach(coef => {
      expect(convertOddToFractional(coef.decimal)).toEqual(coef.fractional);
    });
  });

  it('convertOddToCurrentType tests', () => {
    coefs.forEach(coef => {
      expect(convertOddToCurrentType(+coef.decimal)).toEqual(coef);
    });
  });
});