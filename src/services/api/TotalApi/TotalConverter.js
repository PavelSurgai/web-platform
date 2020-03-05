export class TotalConverter {
  totalConverter = (data) => ({
    credits: data.credits_sum,
    debits: data.debits_sum,
    total: data.total,
  })
}
