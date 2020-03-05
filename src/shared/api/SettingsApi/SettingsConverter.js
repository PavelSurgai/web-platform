export class SettingsConverter {
  convertSettings(data) {
    const { payment, bets, bonus } = data.limits;
    const convertedCurrencies = data.currencies.filter(currency => currency !== 'FUN');
    const converterData = {
      limits: {
        payment: {
          withdrawal: payment.withdrawal,
          topUp: payment.top_up,
        },
        bets: {
          default: bets.default,
          max: bets.max,
          min: bets.min,
        },
        bonus: {
          cashbackBet: bonus.cashback_bet,
          cashbackPayment: bonus.cashback_payment,
          maxBetCount: bonus.max_bet_count,
          maxBonusSize: bonus.max_bonus_size,
          maxBonusPercent: bonus.max_bonus_percent,
          minCoef: bonus.min_coef,
          registrationBonus: bonus.registration_bonus,
        },
      },
      currencies: convertedCurrencies,
      inbetKf: data.INBET_KF,
    };
    return converterData;
  }
}