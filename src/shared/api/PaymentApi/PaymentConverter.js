import dayjs from 'dayjs';

export class PaymentConverter {
  convertPayHistory(data) {
    const payments = data.payments ? data.payments.map(item => {
      return {
        date: dayjs(item.created_at).format('DD.MM.YYYY HH:mm'),
        timneStump: dayjs(item.created_at).valueOf(),
        id: item.id,
        status: item.type,
        amount: item.value,
        type: 'payment',
      };
    }) : [];
    const withdrawals = data.withdrawals ? data.withdrawals.map(item => {
      return {
        date: dayjs(item.created_at).format('DD.MM.YYYY HH:mm'),
        timneStump: dayjs(item.created_at).valueOf(),
        id: item.id,
        isClosed: item.is_closed,
        paymentMode: item.payment_mode,
        purse: item.purse,
        status: item.status,
        amount: item.amount,
        type: 'withdrawal',
      };
    }) : [];
    const convertedData = [...payments, ...withdrawals];
    const sortedData = convertedData.sort((a, b) => b.timneStump - a.timneStump);
    return sortedData;
  }
}