import { lang, getLangIdByName } from './languages';

describe('languages tests', () => {
  it('getLangIdByName return value of lang object', () => {
    Object.keys(lang).forEach(el => {
      expect(getLangIdByName(el)).toBe(lang[el]);
    });
  });
  it('getLangIdByName return number', () => {
    Object.keys(lang).forEach(el => {
      expect(getLangIdByName(el)).toEqual(expect.any(Number));
    });
  });
});