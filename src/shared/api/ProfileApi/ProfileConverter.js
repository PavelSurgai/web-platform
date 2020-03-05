export class ProfileConverter {
  convertUserInfo(data) {
    const { additional, personal } = data;
    const convertedData = {
      phone: additional.address,
      numberDocument: additional.number_document,
      currency: personal.currency === 'FUN' ? 'RUB' : personal.currency,
      firstName: additional.yandex,
      lastName: additional.card,
      id: personal.id,
      balance: personal.balance,
    };
    return convertedData;
  }

  convertUpdateInfo(data) {
    const convertedData = {
      address: data.address,
      card: data.card,
      numberDocument: data.number_document,
      yandex: data.yandex,
    };
    return convertedData;
  }
}