function convertCoefType(coefs) {
  return {
    mainBets: [...coefs].slice(0, 3),
    doubleChance: [...coefs].slice(3, 6),
    handicap: [...coefs].slice(6, 8),
    total: [...coefs].slice(8, 10),
  };
}

export default convertCoefType;