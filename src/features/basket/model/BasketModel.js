import convertOddToCurrentType from 'shared/models/OddsTypeModel';

class BasketModel {
  getTotalCoef = bets => {
    let totalCoef = 1;
    bets.forEach(bet => {
      totalCoef *= bet.rate.decimal;
    });
    const convertedCoef = +totalCoef.toFixed(2);
    return totalCoef > 1000 ? convertOddToCurrentType(1000) : convertOddToCurrentType(convertedCoef);
  }

  getCorrectedLimits = (limitsBetroute, limits) => ({
    min: limits.min > 0 ? limits.min : limitsBetroute.min,
    max: limits.max > 0 && limits.max < limitsBetroute.max ? limits.max : limitsBetroute.max,
    default: limits.default,
  })
}

export default BasketModel;