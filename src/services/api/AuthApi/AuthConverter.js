export class AuthConverter {
  convertUserData(data) {
    const convertedData = {
      id: data.id,
      login: data.email,
      currency: data.currency === 'FUN' ? 'RUB' : data.currency,
      firstName: data.first_name,
      lastName: data.last_name,
      role: +data.role,
    };
    return convertedData;
  }

  convertBalance(data) {
    const convertedData = {
      balance: data.balance,
      bonusBalance: +data.bonus_balance,
      isBanned: data.is_banned,
    };
    return convertedData;
  }
}