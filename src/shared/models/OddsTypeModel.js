function convertOddToCurrentType(odd) {
  return {
    decimal: odd.toFixed(2),
    fractional: convertOddToFractional(odd),
    american: odd !== 1 ? convertOddToAmerican(odd) : 0,
  };
}

export function convertOddToAmerican(coef) {
  const max = 2;
  return coef <= max ? `- ${(100 / (coef - 1)).toFixed()}` : `+ ${((coef - 1) * 100).toFixed()}`;
}

export function convertOddToFractional(coef) {
  const length = (coef.toString().includes('.')) ? (coef.toString().split('.').pop().length) : (0);
  let denominator = 1;
  let tempNumerator = (coef - 1);
  for (let i = 0; i < length; i += 1) {
    denominator *= 10;
    tempNumerator *= 10;
  }
  const gcdRec = (a, b) => (b ? gcdRec(b, a % b) : Math.abs(a));
  const numerator = +tempNumerator.toFixed(0);
  const gcd = gcdRec(numerator, denominator);
  const convertedCoef = `${(numerator / gcd)}/${(denominator / gcd)}`; 
  return convertedCoef;
}

export default convertOddToCurrentType;
