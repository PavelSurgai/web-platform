import dayjs from 'dayjs';

export class BetHistoryConverter {
  convertBetHistory({ d }) {
    const convertedBets = d.Bets ? d.Bets.map(item => {
      const isReturn = item.Coef === 1 && item.Status === 34;
      const isSIngle = item.Flag === 1;
      return {
        id: item.Id,
        name: item.Name,
        date: dayjs(+(item.Date.match(/\d/g).join(''))).format('DD.MM.YYYY, HH:mm'),
        amountIn: item.AmountIn,
        amountOut: item.AmountOut,
        code: item.Code,
        countEvents: item.CountEvents,
        flag: item.Flag,
        isLive: item.IsLive,
        status: isReturn ? 322 : item.Status,
        coef: item.Coef,
        match: item.Match,
        score: item.Score,
        eventDate: isSIngle ? dayjs(+(item.DateEvent.match(/\d/g).join(''))).format('DD.MM.YYYY, HH:mm') : '',
        tourneyName: item.Tournament,
      };
    }) : [];
    return {
      bets: convertedBets,
      count: d.Count,
    };
  }

  convertBetContent({ d }) {
    const convertedData = d.BetsContentDataList.map(item => {
      const isReturn = item.Coef === 1 && item.Status === 2;
      return {
        name: item.BetName,
        coef: item.Coef,
        date: dayjs(+(item.EventDate.match(/\d/g).join(''))).format('DD.MM.YYYY, HH:mm'),
        score: item.MainResult,
        match: item.Teams,
        status: isReturn ? 322 : item.Outcome,
        tourneyName: item.TournamentName,
      };
    });
    return convertedData;
  }

  convertCashoutBets(data) {
    const convertedData = {};
    if (!data.d) {
      return convertedData;
    }
    data.d.forEach(bet => {
      convertedData[bet.BetID] = {
        id: bet.BetID,
        returnAmount: bet.Head.AmountPosWin,
        betCode: bet.NumberBill,
      };
    });
    return convertedData;
  }
}
